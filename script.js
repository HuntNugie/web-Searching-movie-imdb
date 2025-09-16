// membuat ajax
let link = document.querySelector("input")

function getData(link){
    // menggunakan ajax dan promise
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.onload = function(){
            if(xhr.status == 200){
                resolve(JSON.parse(xhr.response))
            }else{
                reject("gagal ambil data")
            }
        }
        xhr.open("GET",link)
        xhr.send()
    })
}
let timer;
const konten = document.getElementById("konten")

link.addEventListener("input",function(event){
    clearTimeout(timer)
    timer = setTimeout(()=>{
        getData(`http://www.omdbapi.com/?apikey=bb6e65b5&s=${event.target.value}`)
        .then((response)=>{
            const {Search} = response
            if(response.Response.toLowerCase() == "true"){
                const teks = tampilData(Search)
                konten.innerHTML = teks
            }else{
                konten.innerHTML = `<h1 class="font-bold text-xl">${response.Error}</h1>`
            }
        }).finally(()=>{
            console.log("Sudah beres")
        })
    },500)
})
//  link.addEventListener("input",function(event){
//     const ambil =  new Promise((resolve,reject)=>{
//         const xhr = new XMLHttpRequest()
//         xhr.onload = function(){
//             if(xhr.status == 200){
//                 resolve(JSON.parse(xhr.response))
//             }else{
//                 reject(xhr.responseText)
//             }
//         }
       
//         xhr.open("GET",`http://www.omdbapi.com/?apikey=bb6e65b5&s=${event.target.value}`)
//         xhr.send()
//     })
    // ambil
    // .then(({Search})=>{
    //     const teks = tampilData(Search)
    //     console.log(teks)
    //     const konten = document.getElementById("konten")
    //     konten.innerHTML = teks
    // })
//  })
function tampilData(object){
    return object.map(el=>{
            return `
            <div class="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
                    <!-- Bagian gambar -->
                    <img
                        src="${el.Poster}"
                        alt="Gambar Card"
                        class="w-full h-auto object-cover"
                    />

                    <!-- Bagian konten -->
                    <div class="p-4">
                        <h2 class="text-xl font-bold text-gray-800">${el.Title}</h2>
                        <p class="text-gray-600 mt-2">
                           ${el.Year}
                        </p>
                        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Lihat Detail
                        </button>
                    </div>
                </div>
        `
    }).join("")
}
// let movies = getData(`http://www.omdbapi.com/?apikey=bb6e65b5&s=anime`)




