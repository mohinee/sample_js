import { attachEventListeners, fetchData, resetData } from "./helper";




export const showTree = () => {
     let button = document.querySelector('#show-tree');
    attachEventListeners('click', button, showTreeHandler);
}

export const hideTree = () => {
     let button = document.querySelector('#hide-tree');
    attachEventListeners('click', button, hideTreeHandler);
}

const hideTreeHandler = () => {
    const treeNode = document.querySelector('#display-tree');
    resetData('data');
    document.querySelector('.content').removeChild(treeNode)
}

const showTreeHandler = () => {
    if(!document.querySelector('#display-tree')){
    const nodeData = fetchData('data');
    const newTree = document.createElement("div");
    newTree.id = "display-tree";
    attachNodes(nodeData.tree, newTree, 0);
    document.querySelector('.content').appendChild(newTree);
    }
}

const attachNodes =(nodes, parent,count) => {
    nodes.map(node => {
        const treeNode = document.createElement("div")
        treeNode.className = 'left-space'
        treeNode.id = 'level-count-'+count
        if(node.childern.length > 0){
            const arrow = document.createElement("button");
            arrow.className = "arrow-button";
            arrow.addEventListener('click', toggleExpansion);
            arrow.levelCount = count+1
            arrow.node = node;
            arrow.textContent = "→"
            treeNode.appendChild(arrow)
        }else{
             const arrow = document.createElement("span")
              
              arrow.textContent = "→   "
              treeNode.appendChild(arrow)
        }
        const nodeText = document.createTextNode(node.node);
        treeNode.appendChild(nodeText);
        parent.appendChild(treeNode);        
    });
    
}

const toggleExpansion = (e) => {
    const node = e.currentTarget.node;
    const parent = e.currentTarget.parentNode;
    const levelCount = e.currentTarget.levelCount;
    node.isExpanded = !node.isExpanded;
    const attachedNode = getChildNodeCount(parent);
    if(node.isExpanded && node.childern.length > 0 && (attachedNode < node.childern.length+1)){
        e.currentTarget.textContent = "↓";
            attachNodes(node.childern, parent, levelCount)
    }
    if(!node.isExpanded && node.childern.length > 0 && getChildNodeCount(parent) > 1){
        e.currentTarget.textContent = "→";
        detachNodes(parent, levelCount)
    }
}

const detachNodes = (parent, levelCount) => {
    const children = parent.getElementsByTagName("div")
    for(let i = children.length-1; i>=0; i--){
        if(children[i].id === "level-count-"+levelCount){
            parent.removeChild(children[i]);
        }
    }
    
}

const getChildNodeCount = (node) => {
    let count = 0;
    node.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            count++;
        }
    });
    return count;
}