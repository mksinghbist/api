let items = require('./data.json')
class Records{
    async recordData(page) {
        console.log("page number ---> " , page)
        if(page == 0 || items.length < page ) {
            return []
        } else {
            var page = page,
            per_page = 10,
            offset = (page - 1) * per_page,
            paginatedItems = items.slice(offset).slice(0, per_page);
            return paginatedItems;
        }
    }
    async paginationData(page) {
        var primaryColorArr = ['red', 'yellow', 'blue'];
        var paginatedItems = await records.recordData(page)
        var idsArr = paginatedItems.map(function(data) { return data.id})
        var openDataArr = paginatedItems.filter(x => x.disposition == "open");
        var closedArr = paginatedItems.filter(x => (x.disposition == "closed" && primaryColorArr.indexOf(x.color) != -1));
        let datSet = new Object();
            datSet.ids = idsArr;
            datSet.open = openDataArr;
            datSet.closedCount = closedArr.length;
        return datSet

    }
}

let records = new Records();
module.exports = records