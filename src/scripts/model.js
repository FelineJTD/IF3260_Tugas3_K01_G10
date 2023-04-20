class Model {
    constructor(name, vertices, indices, color, offset, transform) {
        this.name = name;
        this.vertices = vertices;
        this.faces = faces;
        this.color = color;
        this.colors = [];
        this.children = [];
        this.offset = offset? offset : {x:0,y:0,z:0};
        this.transform = transform? transform : {
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            translation: {
                x: 0,
                y: 0,
                z: 0
            }
        }

        for (let i = 0; i < this.vertices.length/3; i++) {
            this.colors.push(this.color.r);
            this.colors.push(this.color.g);
            this.colors.push(this.color.b);
        }
    }

    // TODO: Map the vertices into draw array format
    // https://gitlab.informatika.org/azharfatrr/if3260_kel10_articulated-model/-/blob/main/src/types/WebGLObject.ts
    exportVertexBuffer() {
        let newVertices = [];
        for (let i = 0; i < this.vertices.length; i++) {
            if (i % 3 === 0) {
                newVertices.push(this.vertices[i] + this.offset.x);
            } else if (i % 3 === 1) {   
                newVertices.push(this.vertices[i] + this.offset.y);
            } else {
                newVertices.push(this.vertices[i] + this.offset.z);
            }
        }
        return new Float32Array(newVertices);
    }

    exportIndexBuffer() {
        return new Uint16Array(this.faces);
    }

    exportColorBuffer() {
        return new Float32Array(this.colors);
    }

    reset() {
        this.name = "";
        this.vertices = [];
        this.faces = [];
        this.color = {r: 1, g: 1, b: 1};
        this.colors = [];
        this.children = [];
    }

    appendChild(model) {
        this.children.push(model);
    }

    updateColor(color) {
        this.color = color;
        this.colors = [];
        for (let i = 0; i < this.vertices.length/3; i++) {
            this.colors.push(this.color.r);
            this.colors.push(this.color.g);
            this.colors.push(this.color.b);
        }
    }
    
    getSelectedModel(idx) {
        if (idx === 0) {
            return this;
        }
      
        idx--;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            const selectedChild = child.getSelectedModel(idx);
            idx -= child.getDescendantCount();
            if (selectedChild != null) {
                return selectedChild;
            }
        }
      
        return null;
    }

    setSelectedModel(idx, model) {
        if (idx === 0) {
            this.reset();
            this.name = model.name;
            this.vertices = model.vertices;
            this.indices = model.indices;
            this.color = model.color;
            this.colors = [];
            for (let i = 0; i < this.vertices.length/3; i++) {
                this.colors.push(this.color.r);
                this.colors.push(this.color.g);
                this.colors.push(this.color.b);
            }
            this.children = [];
            createChildren(this, model.children);
            return;
        }

        idx--;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            const selectedChild = child.getSelectedModel(idx);
            idx -= child.getDescendantCount();
            if (selectedChild != null) {
                selectedChild.reset();
                selectedChild.name = model.name;
                selectedChild.vertices = model.vertices;
                selectedChild.indices = model.indices;
                selectedChild.color = model.color;
                selectedChild.colors = [];
                for (let i = 0; i < selectedChild.vertices.length/3; i++) {
                    selectedChild.colors.push(selectedChild.color.r);
                    selectedChild.colors.push(selectedChild.color.g);
                    selectedChild.colors.push(selectedChild.color.b);
                }
                selectedChild.children = [];
                createChildren(selectedChild, model.children);
                return;
            }
        }
    }
      
    getDescendantCount() {
        let count = 1;
        for (let i = 0; i < this.children.length; i++) {
          count += this.children[i].getDescendantCount();
        }
        return count;
    }
}