(function() {
    cm.define('urlManager', [], function(cm) {
        var parser = document.createElement('a');
        parser.href = window.location.href;

        var getQueryVariable = function(variable) {
            var query = parser.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        };

        return {
            getParam: getQueryVariable
        };
    });

    cm.define('permalinkConfig', ['urlManager'], function(cm, cb) {
        var urlManager = cm.get('urlManager');
        if (urlManager.getParam('config')) {
            var oReq = new XMLHttpRequest();
            oReq.onload = function(e) {
                if (e.currentTarget.readyState === 4 && e.currentTarget.status === 200) {
                    try {
                        var rt = e.currentTarget.response || e.currentTarget.responseText;
                        var jr = JSON.parse(rt.slice(1, -1));
                        var cfg = JSON.parse(jr.Result);
                        cb(cfg);
                    } catch (e) {
                        console.warn('invalid JSON');
                        cb({});
                    }
                }
            };
            oReq.open('get', 'http://maps.kosmosnimki.ru/TinyReference/Get.ashx?id=' + urlManager.getParam('config'), true);
            oReq.send();
        } else {
            return {};
        }
    });

    cm.define('layoutManager', [], function(cm) {
        var mapEl = L.DomUtil.create('div', 'mapContainer', document.body);
        var editButtonEl = L.DomUtil.create('div', 'editButtonContainer', document.body);
        return {
            getMapContainer: function() {
                return mapEl;
            },
            getEditButtonContainer: function() {
                return editButtonEl;
            }
        }
    });

    cm.define('mapApplicationConstructor', ['layoutManager', 'permalinkConfig'], function(cm, cb) {
        var config = cm.get('permalinkConfig');
        var layoutManager = cm.get('layoutManager');
        var macm = nsGmx.createGmxApplication(layoutManager.getMapContainer(), config)
        macm.create().then(function() {
            cb(macm);
        });
    });

    cm.define('editButton', ['mapApplicationConstructor', 'permalinkConfig', 'layoutManager'], function(cm) {
        var permalinkConfig = cm.get('permalinkConfig');
        var layoutManager = cm.get('layoutManager');

        var editButtonContainerEl = layoutManager.getEditButtonContainer();
        var editButtonEl = L.DomUtil.create('a', 'editButton', editButtonContainerEl);
        editButtonEl.innerHTML = L.gmxLocale.getLanguage() === 'rus' ? 'редактировать' : 'edit';
        editButtonEl.setAttribute('href', window.location.href.replace('viewer', 'editor'));

        return editButtonEl;
    });

    cm.define('globals', ['mapApplicationConstructor'], function() {
        var macm = cm.get('mapApplicationConstructor');
        window.macm = macm;
        window.map = macm.get('map');
        window.cal = macm.get('calendar');
        return null;
    });

    cm.create();
})();