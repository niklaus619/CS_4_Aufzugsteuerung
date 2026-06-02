class NodeBufferManager {

    constructor() {
        this.buffers = new Map;
    }

    getInstance(id) {
        if (id) {
            if (this.buffers.has(id)) return this.buffers.get(id);
            const buffer = new NodeBufferInstance(id);
            this.buffers.set(id, buffer);
            return buffer;
        }
        return null;
    }

    destroy() {
        this.buffers.forEach((buffer, id, map) => {
            buffer.destroy();
        });
        this.buffers.clear();
        this.buffers = null;
    }
}

export const NodeBuffer = new NodeBufferManager;

class NodeBufferInstance {

    constructor(id) {
        this.id = id;
        this.timeout = null;
        this.timeoutDelay = 50;
        this.nodes = [];
    }

    addNode(node) {
        if (node) this.nodes.push(node);
    }

    getNodes() {
        return this.nodes;
    }

    hasNodes() {
        return this.nodes.length > 0;
    }

    setTimeout(fnc, delay = this.timeoutDelay) {
        if (fnc) this.timeout = setTimeout(fnc, delay);
    }

    clearTimeout() {
        clearTimeout(this.timeout);
        this.timeout = null;
    }

    empty() {
        this.clearTimeout();
        this.nodes = [];
    }

    destroy() {
        this.clearTimeout();
        this.nodes = null;
    }
}