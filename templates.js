var $list = $('.accordion')
var $patternCategory = $('#pattern-category')
var $patternPlace = $('#pattern-place')

for (var i = 0; i < data.length; i++) {
    var category = data[i]

    var placeList = ''
    for (var place of category.list) {
        placeList += $patternPlace.html()
            .replace('%x', place.x)
            .replace('%y', place.y)
            .replace('%status', 'status' in place ? place.status : '')
            .replace('%name', place.name)
    }

    var content = $patternCategory.html()
        .replace(/%id/g, 'category_' + i)
        .replace('%name', category.title)
        .replace('%count', category.list.length)
        .replace('%list', placeList)

    $list.append(content)
}