const baseurl = "https://localhost:44377";

export const getBanks = async () => {
  try {
      console.log("🦅 ~ getBanks ~ getBanks /Bank");  
      const response = await fetch(baseurl + '/Bank');
      return await response.json();
    } catch {
        throw new Error('error al obtener los bancos.')
    }
}

export const getBranchOffice = async () => {
  try {
    console.log("🦅 ~ getBranchOffice ~ getBranchOffice /BranchOffice");  
    const response = await fetch(baseurl + "/BranchOffice");
    return await response.json();
  } catch {
    throw new Error("error al obtener las sucursales.");
  }
};

export const getExtractsByBank = async (idbank) => {
  try {
    console.log("🦅 ~ getExtractsByBank ~ getExtractsByBank /Extract/Bank/");  
    const response = await fetch(baseurl + "/Extract/Bank/" + idbank);
    return await response.json();
  } catch {
    throw new Error(`error al obtener los extractos con el banco ${idbank}`);
  }
};

export const putExtract = async (extract) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(extract),
    };
    const response = await fetch(baseurl + "/Extract", requestOptions);
    if (response.status !== 200) {
      return response;
    } else {
      return await response.text();
    }
  } catch {
    throw new Error(`error al obtener los extractos con el extracto ${extract.id}`);
  }
};

export const postExtract = async (extract) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(extract),
    };
    const response = await fetch(baseurl + "/Extract", requestOptions);
    if (response.status !== 200) {
      return response;
    } else {
      return await response.text(); 
    }
  } catch {
    throw new Error(
      `error al obtener los extractos con el extracto ${extract.id}`
    );
  }
};