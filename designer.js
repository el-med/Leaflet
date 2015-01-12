(function(Leaflet) {

    /* Default width and height of your widget */
    Leaflet.setWidth('600');
    Leaflet.setHeight('300');

    /* Define custom event for your widget */
    Leaflet.addEvent('click');
    Leaflet.addEvent('dblclick');
    Leaflet.addEvent('mousedown');
    Leaflet.addEvent('mouseup');
    Leaflet.addEvent('mouseover');
    Leaflet.addEvent('mouseout');

    // Override init function
    Leaflet.prototype.init = function(){
        this.node.innerHTML = '';
        this.node.className += ' studio';
    };
});