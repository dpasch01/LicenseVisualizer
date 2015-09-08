function initializeGraph(dotContent,containerId){
    var parsedData = vis.network.convertDot(dotContent);
    var container = document.getElementById(containerId);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }

    var options = parsedData.options;

    options.nodes = {
        color: 'red'
    }

    var network = new vis.Network(container, data, options);
}