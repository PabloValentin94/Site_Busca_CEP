function Associar_Pagina_Externa(indice_pagina)
{

    switch(indice_pagina)
    {

        case 0:
            document.getElementById("frame_pagina_externa").src = "";
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

// Fonte de Pesquisa (Integração com uma API): https://www.youtube.com/watch?v=UDoCiC_e908

function GetEnderecoByCEP(cep)
{

    // Versão inicial:

    /*fetch("https://cep.metoda.com.br/endereco/by-cep?cep=" + cep)
    .then(resposta_http => { return resposta_http.json() })
    .then(endereco_requisitado => {

        var logradouro = endereco_requisitado.descricao;

        var tipo = endereco_requisitado.tipo;

        var descricao_bairro = endereco_requisitado.descricao_bairro;

        var descricao_cidade = endereco_requisitado.descricao_cidade;

        var codigo_ibge_cidade = endereco_requisitado.codigo_cidade_ibge;

        var estado = endereco_requisitado.UF;

        const pais = "Brasil";

    });*/

    // Versão modificada para um melhor entendimento:

    var conexao_api = fetch("https://cep.metoda.com.br/endereco/by-cep?cep=" + cep);

    var resposta_http = conexao_api.then(resposta => { return resposta.json() });
    
    resposta_http.then(endereco => {

        document.getElementById("teste").innerText = endereco.descricao;

    });

}

function GetCidadesByUF(uf)
{

    fetch("https://cep.metoda.com.br/cidade/by-uf?uf=" + uf)
    .then(resposta_http => { return resposta_http.json() })
    .then(lista_cidades => {

        for(i = 0; i < lista_cidades.length; i++)
        {

            console.log(lista_cidades[i].descricao);

        }

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