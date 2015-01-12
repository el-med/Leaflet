/*global WAF, $, L */

'use strict';

WAF.define('Leaflet', ['waf-core/widget'], function (widget) {

    var Leaflet = widget.create('Leaflet', {
        
        zoom: widget.property({
            type: 'number',
            defaultValue: 9
        }),

        items: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'lat'
            }, {
                name: 'lan'
            },{
                name: 'popups'
            }]
        }),

        init: function () {
            var self = this,
                marker,
                map = L.map(this.node);
        
            map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; OpenStreetMap contributors'
            }));

            this.map = map;

            function update() {
                var items = self.items();
                var latlng = new L.LatLng(items.lat, items.lan);

                map.setView(latlng, self.zoom());

                if (marker) {
                    map.removeLayer(marker);
                }

                marker = L.marker(latlng).addTo(map);

                if (items.popups) {
                    marker.bindPopup(items.popups);
                    marker.openPopup();
                }
            }

            if (this.items()) {
                //One day maybe.
                //this.items().addListener('currentElementChange', update);
                update();
            }

            // ****** Events 
            // Propagate map events to waf listeners
            map.on({
                "click": function (e) {
                    self.fire("click", e.data);
                },
                "dblclick": function (e) {
                    self.fire('dblclick', e.data);
                },
                "mousedown": function (e) {
                    self.fire('mousedown', e.data);
                },
                "mouseup": function (e) {
                    self.fire('mouseup', e.data);
                },
                "mouseover": function (e) {
                    self.fire('mouseover', e.data);
                },
                "mouseout": function (e) {
                    self.fire('mouseout', e.data);
                }
            });
        },

        getMap: function () {
            return this.map;
        }
    });

    return Leaflet;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */