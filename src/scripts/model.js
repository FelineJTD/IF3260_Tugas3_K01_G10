class Model {
    constructor(name, vertices, indices, color, offset) {
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;
        this.color = color;
        this.colors = [];
        this.children = [];
        this.offset = offset? offset : {x:0,y:0,z:0};
        this.transform = {
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
            this.colors.push(this.color[0]);
            this.colors.push(this.color[1]);
            this.colors.push(this.color[2]);
        }
    }

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
        return new Uint16Array(this.indices);
    }

    exportColorBuffer() {
        return new Float32Array(this.colors);
    }

    reset() {
        this.name = "";
        this.vertices = [];
        this.indices = [];
        this.color = [1, 1, 1];
        this.colors = [];
        this.children = [];
    }

    appendChild(model) {
        this.children.push(model);
    }

    // appendModel(model, verticesOffset) {
    //     let offset = this.vertices.length/3;
    //     for (let i = 0; i < model.vertices.length; i++) {
    //         this.vertices.push(model.vertices[i] + verticesOffset);
    //     }
    //     for (let i = 0; i < model.indices.length; i++) {
    //         this.indices.push(model.indices[i] + offset);
    //     }
    //     for (let i = 0; i < model.vertices.length/3; i++) {
    //         this.colors.push(model.color[0]);
    //         this.colors.push(model.color[1]);
    //         this.colors.push(model.color[2]);
    //     }
    // }

    updateColor(color) {
        this.color = color;
        this.colors = [];
        for (let i = 0; i < this.vertices.length/3; i++) {
            this.colors.push(this.color[0]);
            this.colors.push(this.color[1]);
            this.colors.push(this.color[2]);
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
            if (selectedChild) {
                return selectedChild;
            }
            idx -= child.getDescendantCount();
            if (idx <= 0) {
                return null;
            }
        }
      
        return null;
    }
      
    getDescendantCount() {
        let count = 1;
        for (let i = 0; i < this.children.length; i++) {
          count += this.children[i].getDescendantCount();
        }
        return count;
    }
}