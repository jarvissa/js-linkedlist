const LinkedListNode = require("./LinkedListNode");

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }
        
        return newNode;
    }

    append(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return newNode;
        }
        
        const currentTail = this.tail;
        currentTail.next = newNode;
        this.tail = newNode;

        return newNode;
    }

    insertAt(value, index) {
        if (index < 0 || index >= this.size()) {
            throw new Error("Out of index");
        } else {
            if (index === 0) {
                return this.prepend(value);
            } else {
                const newNode = new LinkedListNode(value);
                let previousNode = null;
                let currentNode = this.head;
                let i = 0;

                while (i < index) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;

                    i++;
                }

                newNode.next = currentNode;
                previousNode.next = newNode;

                return newNode;
            }
        }
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        
        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.tail.value === value) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    deleteFrom(index) {
        if (index < 0 || index >= this.size()) {
            throw new Error("Out of index");
        } else {
            if (index === 0) {
                return this.deleteHead();
            } else {
                let previousNode = null;
                let currentNode = this.head;
                let i = 0;

                while (i < index) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                    i++;
                }

                previousNode.next = currentNode.next;

                return currentNode;
            }
        }
    }

    deleteHead() {
        const deletedNode = this.head;

        if (this.head && this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedNode;
    }

    deleteTail() {
        const deletedNode = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedNode;
        }

        let currentNode = this.head;

        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedNode;
    }

    find(value) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    indexOf(value) {
        let index = 0;
        let currentNode = this.head;

        while (currentNode !== null) {
            if (currentNode.value === value) {
                return index;
            }
            currentNode = currentNode.next;
            index++;
        }

        return -1;
    }

    size() {
        let count = 0;
        let currentNode = this.head;

        while (currentNode) {
            count++;
            currentNode = currentNode.next;
        }

        return count;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.head = null;
        this.tail = null;
    }

    fromArray(values) {
        values.forEach(value => {
            this.append(value);
        });

        return this;
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
}

module.exports = LinkedList;