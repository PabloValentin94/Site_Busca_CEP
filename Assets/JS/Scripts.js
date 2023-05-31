// Fonte de Pesquisa (Integração com uma API): https://www.youtube.com/watch?v=UDoCiC_e908

const host = "https://cep.metoda.com.br";
//const host = "http://localhost:8000";

var requisicao_api;

var resposta_http;

function Associar_Pagina_Externa(indice_pagina)
{

    switch(indice_pagina)
    {

        case 0:
            document.getElementById("frame_pagina_externa").src = "Inicio.html";
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

function GetEnderecoByCEP(condicao_pesquisar_limpar)
{

    switch(condicao_pesquisar_limpar)
    {

        case 0:

            document.getElementById("input_cep").value = "";

            document.getElementById("dado_logradouro").innerText = "";

            document.getElementById("dado_tipo").innerText = "";

            document.getElementById("dado_bairro").innerText = "";

            document.getElementById("dado_cidade").innerText = "";

            document.getElementById("dado_codigo_ibge_cidade").innerText = "";

            document.getElementById("dado_estado").innerText = "";
            
            document.getElementById("dado_pais").innerText = "";

        break;

        case 1:

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

            //console.clear();

            const cep = document.getElementById("input_cep").value;

            requisicao_api = fetch(host + "/endereco/by-cep?cep=" + cep);

            resposta_http = requisicao_api.then(resposta => { return resposta.json() });
            
            resposta_http.then(endereco => {

                //console.log(endereco);

                if(typeof endereco.CEP !== "undefined")
                {

                    document.getElementById("dado_logradouro").innerText = endereco.descricao;

                    document.getElementById("dado_tipo").innerText = endereco.tipo;

                    document.getElementById("dado_bairro").innerText = endereco.descricao_bairro;

                    document.getElementById("dado_cidade").innerText = endereco.descricao_cidade;

                    document.getElementById("dado_codigo_ibge_cidade").innerText = endereco.codigo_cidade_ibge;

                    document.getElementById("dado_estado").innerText = endereco.UF;
                    
                    document.getElementById("dado_pais").innerText = "Brasil";

                }

            });

        break;

    }

}

function GetCidadesByUF()
{

    /*fetch("https://cep.metoda.com.br/cidade/by-uf?uf=" + estado)
    .then(resposta_http => { return resposta_http.json() })
    .then(lista_cidades => {

        for(i = 0; i < lista_cidades.length; i++)
        {

            //console.log(lista_cidades[i].descricao);

        }

    });*/

    //console.clear();

    document.getElementById("tabela_cidades").innerHTML = "";

    const estado = document.getElementById("select_estado").value;

    requisicao_api = fetch(host + "/cidade/by-uf?uf=" + estado);

    resposta_http = requisicao_api.then(resposta => { return resposta.json() });

    resposta_http.then(lista_cidades => {

        for(i = 0; i < lista_cidades.length; i++)
        {

            //console.log(lista_cidades[i]);

            //console.log(lista_cidades[i].descricao);

            if(lista_cidades[i].descricao != "")
            {

                document.getElementById("tabela_cidades").innerHTML += "<p>" + lista_cidades[i].descricao + "</p>";

            }

        }

    });

}

function GetCEPsByLogradouro(condicao_pesquisar_limpar)
{

    switch(condicao_pesquisar_limpar)
    {

        case 0:

            document.getElementById("input_logradouro").value = "";

            document.getElementById("tabela_ceps").innerHTML = "";

        break;

        case 1:

            //console.clear();

            document.getElementById("tabela_ceps").innerHTML = "";

            const logradouro = document.getElementById("input_logradouro").value;

            requisicao_api = fetch(host + "/cep/by-logradouro?logradouro=" + logradouro);

            resposta_http = requisicao_api.then(resposta => { return resposta.json() });

            resposta_http.then(lista_ceps => {

                for(i = 0; i < lista_ceps.length; i++)
                {

                    //console.log(lista_ceps[i]);

                    if(lista_ceps[i].CEP != "")
                    {

                        const cep_formatado = lista_ceps[i].CEP[0] + lista_ceps[i].CEP[1] + "."
                        + lista_ceps[i].CEP[2] + lista_ceps[i].CEP[3] + lista_ceps[i].CEP[4] + "-"
                        + lista_ceps[i].CEP[5] + lista_ceps[i].CEP[6] + lista_ceps[i].CEP[7];

                        document.getElementById("tabela_ceps").innerHTML += "<p>" + cep_formatado + "</p>";

                    }

                }

            });

        break;

    }

}

function GetBairrosByIDCidade()
{

    //console.clear();

    document.getElementById("tabela_bairros").innerHTML = "";

    const id_cidade = document.getElementById("select_cidade").value;

    requisicao_api = fetch(host + "/bairro/by-cidade?id_cidade=" + id_cidade);

    resposta_http = requisicao_api.then(resposta => { return resposta.json() });

    resposta_http.then(lista_bairros => {

        for(i = 0; i < lista_bairros.length; i++)
        {

            if(lista_bairros[i].descricao_bairro != "")
            {

                document.getElementById("tabela_bairros").innerHTML += "<p>" + lista_bairros[i].descricao_bairro + "</p>";

            }

        }

    });

}

function GetLogradourosByBairroAndIDCidade()
{

    //console.clear();

    document.getElementById("tabela_logradouros").innerHTML = "";

    const id_cidade = document.getElementById("select_cidade").value;

    const bairro = document.getElementById("select_bairro").value;

    requisicao_api = fetch(host + "/logradouro/by-bairro?id_cidade=" + id_cidade + "&bairro=" + bairro);

    resposta_http = requisicao_api.then(resposta => { return resposta.json() });

    resposta_http.then(lista_logradouros => {

        for(i = 0; i < lista_logradouros.length; i++)
        {

            console.log(lista_logradouros[i]);

            if(lista_logradouros[i].descricao != "")
            {

                document.getElementById("tabela_logradouros").innerHTML += "<p>" + lista_logradouros[i].descricao + "</p>";

            }

        }

    });

}

// Funções - Mundança de valor de algum Select que interfira em outro.

function MudancaSelectEstado()
{

    //console.clear();

    document.getElementById("select_cidade").innerHTML = "";

    document.getElementById("select_cidade").innerHTML += "<option> Selecione </option>"

    const estado = document.getElementById("select_estado").value;

    requisicao_api = fetch(host + "/cidade/by-uf?uf=" + estado);

    resposta_http = requisicao_api.then(resposta => { return resposta.json() });

    resposta_http.then(lista_cidades => {

        //console.log(lista_cidades);

        for(i = 0; i < lista_cidades.length; i++)
        {

            if(lista_cidades[i].descricao != "")
            {

                document.getElementById("select_cidade").innerHTML += "<option value='" + lista_cidades[i].id_cidade + "'>" + lista_cidades[i].descricao + "</option>";

            }

        }

    });

}

function MudancaSelectCidade()
{

    //console.clear();

    document.getElementById("select_bairro").innerHTML = "";

    document.getElementById("select_bairro").innerHTML += "<option> Selecione </option>"

    const id_cidade = document.getElementById("select_cidade").value;

    requisicao_api = fetch(host + "/bairro/by-cidade?id_cidade=" + id_cidade);

    resposta_http = requisicao_api.then(resposta => { return resposta.json() });

    resposta_http.then(lista_bairros => {

        console.log(lista_bairros);

        for(i = 0; i < lista_bairros.length; i++)
        {

            if(lista_bairros[i].descricao_bairro != "")
            {

                document.getElementById("select_bairro").innerHTML += "<option value='" + lista_bairros[i].descricao_bairro + "'>" + lista_bairros[i].descricao_bairro + "</option>";

            }

        }

    });

}