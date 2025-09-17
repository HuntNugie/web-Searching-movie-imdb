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
          
            return response
        })
        .then(({Search})=>history.pushState({page:"search",keyword:link.value,data:Search},"",`?search=${link.value}`))
        .finally((response)=>{
            console.log(response)
            

        })
    },500)
})

window.addEventListener("popstate",function(event){
    konten.className = "grid grid-cols-4 gap-4 mt-6"
    konten.innerHTML = tampilData(event.state.data)
})

function renderDetail(object){
    let teks =  `
                <!-- Gambar -->
                <div class="w-1/3">
                    <img
                        src="${object.Poster}"
                        alt="Poster Film"
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- Detail Film -->
                <div class="w-2/3 p-6">
                    <h2 class="text-2xl font-bold text-gray-800">${object.Title}</h2>
                    <p class="text-gray-600 mt-2">
                        Tahun: ${object.Year}<br />
                        Genre: ${object.Genre}<br />
                        Durasi: ${object.runtime}
                    </p>
                    <p class="mt-4 text-gray-700 leading-relaxed">
                        ${object.Plot}
                    </p>
                </div>
           `
        konten.className = "max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex"
        return konten.innerHTML = teks
}
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
                        <button class="button mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" data-imdbID="${el.imdbID}">
                            Lihat Detail
                        </button>
                    </div>
                </div>
        `
    }).join("")
}
// let movies = getData(`http://www.omdbapi.com/?apikey=bb6e65b5&s=anime`)


document.querySelector(".home").addEventListener("click",()=>{
    window.location.reload()
})

konten.addEventListener("click",function(e){
    if(e.target.classList.contains("button")){
        history.pushState({page:"detail",id:e.target.getAttribute("data-imdbID")},"","?id="+e.target.getAttribute("data-imdbID"))
        getData(`http://www.omdbapi.com/?apikey=bb6e65b5&i=${e.target.getAttribute("data-imdbID")}`)
            .then(response=>{
                renderDetail(response)
            })
    }
})


