$('#map').height($(window).height() * .75)
var map, selectedViolation

DG.then(function () {
    map = DG.map('map', {
        fullscreenControl: false,
        center: geoCenter,
        zoom: geoZoom
    })

    var selectedIcon = DG.icon({
        iconUrl: 'img/active.png',
        iconSize: [22, 34]
    })
    var inactiveIcon = DG.icon({
        iconUrl: 'img/inactive.png',
        iconSize: [22, 34]
    })
    var visitedIcon = DG.icon({
        iconUrl: 'img/visited.png',
        iconSize: [22, 34]
    })

    var markerList = []
    for (var category of data) {
        for (var place of category.list) {
            var opts = {}
            if ('status' in place) {
                switch (place.status) {
                    case 'inactive':
                        opts.icon = inactiveIcon
                        break
                    case 'visited':
                        opts.icon = visitedIcon
                        break
                }
            }
            var marker = DG.marker([place.x, place.y], opts).bindPopup(place.name)
            markerList.push(marker)
        }
    }
    var group = DG.featureGroup(markerList).addTo(map)
    DG.control.location({position: 'topleft'}).addTo(map)

    $('a.list-group-item').on('click', function () {
        if (undefined !== selectedViolation) selectedViolation.removeFrom(map)

        var label = $('span.label', this).text()
        var coordinates = $(this).data('geo').split(',').map(function (item) {
            return parseFloat(item.trim())
        })

        selectedViolation = DG.marker(coordinates, {icon: selectedIcon}).addTo(map).bindLabel(label)
        map.setView(coordinates)

        $list.find('a.list-group-item').each(function () {
            $(this).removeClass('active')
        })
        $(this).toggleClass('active')
    })
})