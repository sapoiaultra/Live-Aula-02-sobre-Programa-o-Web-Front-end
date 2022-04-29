let imagens_banner=[new Image(),new Image(),new Image(),new Image(),new Image(),new Image()]

let i_banner= 0;
let max_banner = imagens_banner.length;

for(let i = 0; i < max_banner; i++){
  imagens_banner[i].src = "b"+ i +".jpg"
  let img=document.createElement('img')
  img.setAttribute('src',"b"+ i +".jpg")
  img.setAttribute('id',"b"+ i)
  img.setAttribute('class',"esconde_banner")
  document.getElementById('banner').appendChild(img)
}

// banner rotativo
const proximoBanner=()=>{
  document.getElementById('b'+i_banner).classList.add("esconde_banner");
  i_banner++;
  if(i_banner > max_banner-1)
    i_banner = 0;
  document.getElementById('b'+i_banner).classList.remove("esconde_banner");
}
let intervaloBanner= setInterval(proximoBanner, 5000);

const f_btn_ante=()=>{
  clearInterval(intervaloBanner);
  document.getElementById('b'+i_banner).classList.add("esconde_banner");
  i_banner--;
  if(i_banner < 0)
    i_banner = max_banner - 1;
  document.getElementById('b'+i_banner).classList.remove("esconde_banner");
  intervaloBanner= setInterval(proximoBanner, 5000);
}
// Repete
document.getElementById('btn_ante').addEventListener('click', f_btn_ante)

// Agora é para o próximo
const f_btn_prox=()=>{
  clearInterval(intervaloBanner);
  document.getElementById('b'+i_banner).classList.add("esconde_banner");
  i_banner++;
  if(i_banner > max_banner - 1)
    i_banner = 0;
  document.getElementById('b'+i_banner).classList.remove("esconde_banner");
  intervaloBanner= setInterval(proximoBanner, 5000);
}
// Repete
document.getElementById('btn_prox').addEventListener('click', f_btn_prox)

//////////////////////////////////////////////////////////////////////////////
async function chamaApi(url){
  let artigos = document.getElementById('artigos')

  fetch(url)
  .then(resp=>resp.json())
  .then(  // Quando esta tudo certo
    (resp)=>{
      if(resp.status == 200){
        console.log('Requisição OK');
      } else if(resp.status == 404){
        console.log('Não encontrou o resultado.')
        return new Error('Não encontrou o resultado.')
      }
      return resp.map((r)=>{
        let article = document.createElement('article');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');

        h1.innerHTML= r.titulo;
        p.innerHTML = r.desc;

        article.appendChild(h1); //appendChild - anexar filho
        article.appendChild(p);
        artigos.appendChild(article);
      })
    }
    
  )
  .catch(()=>console.log('Falha na requisição')) // Quando ocorre erro
}
chamaApi('https://liveaulaapi1node.jaoeduardo1.repl.co/');