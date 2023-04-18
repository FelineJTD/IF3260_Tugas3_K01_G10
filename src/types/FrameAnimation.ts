export class FrameTransformation {
    public translateObj: number[] = [0, 0, 0];
    public rotationObj: number[] = [0, 0, 0];
    public scaleObj: number[] = [1, 1, 1];
    public translateChild: number[] = [0, 0, 0];
    public rotationChild: number[] = [0, 0, 0];
    public scaleChild: number[] = [1, 1, 1];
}

export class Frame {
    public transformations: FrameTransformation[] = [];

    animateFrame(frameIdx: number){
        let addFrame = new FrameTransformation();
        // Copy the values
        for(let i=0; i<3; i++){
            addFrame.translateObj[i] = this.transformations[frameIdx].translateObj[i];
            addFrame.rotationObj[i] = this.transformations[frameIdx].rotationObj[i];
            addFrame.scaleObj[i] = this.transformations[frameIdx].scaleObj[i];
            addFrame.translateChild[i] = this.transformations[frameIdx].translateChild[i];
            addFrame.rotationChild[i] = this.transformations[frameIdx].rotationChild[i];
            addFrame.scaleChild[i] = this.transformations[frameIdx].scaleChild[i];
        }
        this.transformations.splice(frameIdx, 0, addFrame);
    }
}

export class FrameAnimation {
    public frames: Frame[] = [];
    public currFrame: number = 0;

    animateFrame(frameIdx: number){
        for(const element of this.frames){
            element.animateFrame(frameIdx);   
        }
    }
}