const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const base = 'http://dtu.ac.in/'

const tab_notices = []
const tab_FirstYearNotices = []
axios(base).then(response => {
    const html = response.data

    const $ = cheerio.load(html)

    // console.log(html)
    // const sample = []
    // const tab1 = $('#tab1', html)
    // console.log(tab1.text())

    // })
    $('#tab1', html).each(function () {
        $('.colr', this).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            tab_notices.push({
                title,
                url: base + url
            })
        })
    })

    $('#tab8', html).each(function () {
        $('.colr', this).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href')

            tab_FirstYearNotices.push({
                title,
                url: base + url
            })
        })
    })





    // res.json(articles)
}).catch(error => console.log(error))

app.listen(PORT, () =>
    console.log(`the server is running at Port ${PORT}`))

app.get('/', (req, res) => {
    // res.json({ message: "the API is working fine" })
    // res.json(tab_notices)
    res.json(tab_FirstYearNotices)
})









