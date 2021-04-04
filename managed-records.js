var express = require('express');
const app = express();
const port = 3000;
var records = require('./managed-controller')
app.get('/records', async (req, res) => {
    let page = req.query.page; 
    if(page != undefined && page != "" && page != null) {
        let prirewsPageNo = page-1;
        let nextPageNo = page+1;
        let currentPageData = await records.paginationData(page);
        var previousPageData = await records.recordData(prirewsPageNo);
        currentPageData.PreviousPage = previousPageData
        var nextPageData = await records.recordData(nextPageNo);
        currentPageData.nextPageData = nextPageData
        res.send(currentPageData)
    } else {
        let dataSet = Object();
        dataSet.status = "Error"
        if(page == undefined) {
            dataSet.error = "Not found page number"
        } else {
            dataSet.error = "missing page number"
        }
        res.send(dataSet)
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})