/*global WAF, $, L */

'use strict';

WAF.define('Leaflet', ['waf-core/widget'], function (widget) {

    var Leaflet = widget.create('Leaflet', {
   
        // Properties
        zoom: widget.property({ type: 'number', defaultValue: 10 }),
        lat:  widget.property({ type: 'number', defaultValue: 0 }),
        lan:  widget.property({ type: 'number', defaultValue: 0 }),
        text: widget.property({ type: 'string' }),

        // Initialize widget
        init: function () {
            var subscriber;

            this._map = L.map(this.node);
            this._map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; OpenStreetMap contributors'
            }));

            // Listen for updates
            subscriber = this.subscribe('change', this._update, this);
            subscriber.options.once = true;
            this._update();

            function proxyEvent(eventName, self) {
                return function (e) {
                    self.fire(eventName, e.data);
                };
            }

            // ****** Events 
            // Propagate map events to waf listeners
            this._map.on({
                "click":     proxyEvent('click',     this),
                "dblclick":  proxyEvent('dblclick',  this),
                "mousedown": proxyEvent('mousedown', this),
                "mouseup":   proxyEvent('mouseup',   this),
                "mouseover": proxyEvent('mouseover', this),
                "mouseout":  proxyEvent('mouseout',  this)
            });
        },

        // Return map object
        getMap: function () {
            return this._map;
        },

        // Update map view
        _update: function () {
            var latlng = new L.LatLng(this.lat() || 0, this.lan() || 0);
            this._map.setView(latlng, this.zoom() || 0);

            if (!this._marker) {
                this._marker = L.marker(latlng);
                this._marker.addTo(this._map);
            }

            this._marker.setLatLng(latlng);

            if (this.text()) {
                this._marker.bindPopup(this.text());
                this._marker.openPopup();
            }
            else {
                this._marker.setPopupContent('');
                this._marker.closePopup();
            }
        }
    });

    return Leaflet;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */