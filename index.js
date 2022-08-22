const express = require('express')

const app = express()
const port = 5000

app.set('view engine', 'hbs') // set view engine hbs
app.use('/assets', express.static(__dirname + '/assets')) // path folder untuk assets
app.use(express.urlencoded({ extended: false }))

const data_base = require('./connection/dataBase')



app.get('/', function (request, response) {

    // console.log(dataProject)
    //(item) menampung data dari dataProject
    // let data = dataProject.map(function (item) {
    //     return {
    //         ...item,
    //         // author: "Sayed Jilliyan",
    //         date: getFullTime(item.durasi),
    //         durasi: getDistanceTime(new Date(item.start), new Date(item.end)), 

    //     }
    // })

    // // console.log(data);

    data_base.connect(function (err, client, done) {
        if (err) throw err // menampilkan error koneksi ke database

        client.query('SELECT * FROM tb_projects', function (err, result) {
            if (err) throw err // menampilkan error query

            console.log(result.rows);
            let data = result.rows
            let data_project = data.map(function (item) {
                return {
                    ...item,
                    date: getFullTime(item.durasi),
                    durasi: getDistanceTime(item.start_date, item.end_date)
                }
            })


            response.render("index", { dataProject: data_project})
        })
    })

})

app.get('/add-project', function (request, response) {
    response.render("addProject")
})

app.post('/add-project', function (request, response) {
    // let title = request.body.inputProjactName
    // let start = request.body.startDate
    // let end = request.body.endDate
    // let desc = request.body.inputDesc
    // let image = request.body.inputImage

    // let nodeJs = request.body.endDate
    // let reactJs = request.body.endDate
    // let nextJs = request.body.endDate
    // let typScript = request.body.endDate


    // console.log(title);
    // console.log(start);
    // console.log(end);
    // console.log(desc);
    // // console.log(nodeJs);
    // // console.log(reactJs);
    // // console.log(nextJs);
    // // console.log(typScript);
    // console.log(image);

    // let project = {
    //     title,
    //     durasi: new Date(),
    //     start,
    //     end,
    //     desc,
    //     image
    // }

    // dataProject.push(project)

    // response.redirect("/")
})


app.get('/contact', function (request, response) {
    response.render("contact")
})

app.get('/project-detail/:index', function (request, response) {

    // let index = request.params.index
    // let data = dataProject[index]

    // data = {
    //     durasi: getDistanceTime(new Date(data.start), new Date(data.end)),
    //     title: data.title,
    //     desc: data.desc,
    //     start: data.start,
    //     end: data.end
    //     // start: data.start,
    //     // end: data.end
    // }

    // data.durasi = getDistanceTime(data.durasi)

    // console.log(id);

    response.render("project-detail") //, {data}
})

app.get('/delete-project/:index', function (request, response) {
    // console.log(request.params);
    // let index =request.params.index
    // console.log(index);

    // dataProject.splice(index, 1)

    // response.redirect('/')
})

app.get('/edit-project/:index', function (request, response) {
    // let index = request.params.index

    // let data = {
    //     title: dataProject[index].title,
    //     start: dataProject[index].start,
    //     durasi: dataProject[index].durasi,
    //     end: dataProject[index].end,
    //     desc: dataProject[index].desc,
    //     image: dataProject[index].image
    // }

    // response.render("updateProject")  //, {index, data}

})

app.post('/edit-project/:index', function (request, response) {
    // let index = request.params.index

    // dataProject[index].title = request.body.inputProjactName
    // dataProject[index].start = request.body.startDate
    // dataProject[index].end = request.body.endDate
    // dataProject[index].desc = request.body.inputDesc
    // dataProject[index].image = request.body.inputImage

    // let nodeJs = request.body.endDate
    // let reactJs = request.body.endDate
    // let nextJs = request.body.endDate
    // let typScript = request.body.endDate


    // console.log(title);
    // console.log(start);
    // console.log(end);
    // console.log(desc);
    // // console.log(nodeJs);
    // // console.log(reactJs);
    // // console.log(nextJs);
    // // console.log(typScript);
    // console.log(image);



    //response.redirect("/")
})


function getFullTime(time) {

    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (hours < 10) {
        hours = "0" + hours
    } else if (minutes < 10) {
        minutes = "0" + minutes
    }

    // 12 Agustus 2022 09.04
    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
    // console.log(fullTime);
    return fullTime
}

function getDistanceTime(start, end) {

    let timeNow = end
    let timePost = start

    let distance = timeNow - timePost
    // console.log(distance);

    let milisecond = 1000 // 1 detik 1000 milisecond
    let secondInHours = 3600 // 1 jam sama dengan 3600 detik
    let hoursInDay = 24 // 1 hari 24 jam
    let daysInMonth = 30 // 1 bulan 30 hari
    let monthsInYear = 12 // 1 tahun 12 bulan

    let distanceYear = Math.floor(distance / (milisecond * secondInHours * hoursInDay * daysInMonth * monthsInYear))
    let distanceMonth = Math.floor(distance / (milisecond * secondInHours * hoursInDay * daysInMonth))
    let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay))
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60))
    let distanceMinutes = Math.floor(distance / (milisecond * 60))
    let distanceSeconds = Math.floor(distance / milisecond)

    if (distanceYear > 0) {
        return `${distanceYear} tahun`
    } else if (distanceMonth > 0) {
        return `${distanceMonth} bulan`
    } else if (distanceDay > 0) {
        return `${distanceDay} hari`
    } else if (distanceHours > 0) {
        return `${distanceHours} jam`
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} menit`
    } else {
        return `${distanceSeconds} detik`
    }
}


app.listen(5000, function () {
    console.log(`Server running on port ${port}`);
})