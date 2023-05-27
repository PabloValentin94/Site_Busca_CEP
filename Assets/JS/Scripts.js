function Associar_Pagina_Externa(indice_pagina)
{

    switch(indice_pagina)
    {

        case 0:
            document.getElementById("frame_pagina_externa").src = "Index.html";
        break;

        case 1:
            document.getElementById("frame_pagina_externa").src = "Endereco_pelo_CEP.html";
        break;

        case 2:
            document.getElementById("frame_pagina_externa").src = "Cidades_por_Estado.html";
        break;

        case 3:
            document.getElementById("frame_pagina_externa").src = "CEPs_por_Logradouro.html";
        break;

        case 4:
            document.getElementById("frame_pagina_externa").src = "Bairros_por_Cidade.html";
        break;

        case 5:
            document.getElementById("frame_pagina_externa").src = "Logradouros_por_Bairro.html";
        break;

    }

}

function GetEnderecoByCEP(cep)
{

    const elemento = document.getElementById("teste");

    endereco = fetch("https://cep.metoda.com.br/endereco/by-cep?cep=" + cep)
    .then(resposta_http => { return resposta_http.json() })
    .then(endereco_requisitado => {

        var logradouro = endereco_requisitado.descricao;

        var tipo = endereco_requisitado.tipo;

        var descricao_bairro = endereco_requisitado.descricao_bairro;

        var descricao_cidade = endereco_requisitado.descricao_cidade;

        var codigo_ibge_cidade = endereco_requisitado.codigo_cidade_ibge;

        var estado = endereco_requisitado.UF;

        const pais = "Brasil";

        elemento.innerText = logradouro + " " + tipo + " " + descricao_bairro
        + " " + descricao_cidade + " " + codigo_ibge_cidade + " " + estado + " " + pais;

    });

}

function GetCidadesByUF(uf)
{

    const elemento = document.getElementById("teste");

    fetch("https://cep.metoda.com.br/cidade/by-uf?uf=" + uf)
    .then(resposta_http => { return resposta_http.json() })
    .then(lista_cidades_requisitadas => {

        //console.log(lista_cidades_requisitadas);

        var cidade = lista_cidades_requisitadas[0].descricao;

        elemento.innerText = cidade;

        //console.log(lista_cidades_requisitadas.length);

    })

}

function GetCEPsByLogradouro(logradouro)
{

    

}

function GetBairrosByIDCidade(id_cidade)
{



}

function GetLogradourosByBairroAndCidade(bairro, id_cidade)
{



}