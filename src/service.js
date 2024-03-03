const baseurl = "https://localhost:44377";
export const getBanks = async () => {
    try {
        const response = await fetch(baseurl + '/Bank');
        return response.json();
    } catch {
        throw new Error('error al obtener los bancos.')
    }
}

export const getBranchOffice = async () => {
  try {
    const response = await fetch(baseurl + "/BranchOffice");
    return response.json();
  } catch {
    throw new Error("error al obtener las sucursales.");
  }
};

export const getExtractsByBank = async (idbank) => {
  try {
    const response = await fetch(baseurl + "/Extract/Bank/" + idbank);
    return response.json();
  } catch {
    throw new Error(`error al obtener los extractos con el banco ${idbank}`);
  }
};
/*
const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React PUT Request Example' })
    };
    fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
*/

export const putExtract = async (extract) => {
  console.log(extract);
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(extract),
    };
    const response = await fetch(baseurl + "/Extract", requestOptions);
    return response.json();
  } catch {
    throw new Error(`error al obtener los extractos con el extracto ${extract.id}`);
  }
};