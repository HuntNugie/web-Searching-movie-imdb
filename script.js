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
                reject(xhr.responseText)
            }
        }
        xhr.open("GET",link)
        xhr.send()
    })
}
link.addEventListener("input",function(event){
getData(`http://www.omdbapi.com/?apikey=bb6e65b5&s=${event.target.value}`)
    .then(({Search})=>{
        const teks = tampilData(Search)
        console.log(teks)
        const konten = document.getElementById("konten")
        konten.innerHTML = teks
    })
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




