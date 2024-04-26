const baseurl = "https://localhost:44377";

export const getBanks = async (token) => {
  const url = `/Bank`;
  try {
    console.log(`🦅 ~ service.js ~ getBanks ~ ${url}`);
    const response = await fetch(baseurl + url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    return await response.json();
  } catch {
    throw new Error("error al obtener los bancos.");
  }
};

export const getBranchOffice = async (token) => {
  const url = `/BranchOffice`;
  try {
    console.log(`🦅 ~ service.js ~ getBranchOffice ~ ${url}`);
    const response = await fetch(baseurl + url, {
      headers: {
        "Authorization": "Bearer " + token
      },
    });
    return await response.json();
  } catch {
    throw new Error(`error al obtener las sucursales, ${url}`);
  }
};

export const getExtractsByBank = async (token, idbank) => {
  const url = `/Extract/Bank/${idbank}`;
  try {
    console.log(`🦅 ~ service.js ~ getExtractsByBank ~ ${url}`);
    const response = await fetch(baseurl + url, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
    return await response.json();
  } catch {
    throw new Error(`error al obtener los extractos con el banco ${idbank}`);
  }
};

export const putExtract = async (token, extract) => {
  const url = `/Extract`;
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify(extract),
    };
    const response = await fetch(baseurl + url, requestOptions);
    if (!response.ok) {
      return response;
    } else {
      return await response.text();
    }
  } catch {
    throw new Error(
      `error al obtener los extractos, ${url} | id: ${extract.id}`
    );
  }
};

export const postExtract = async (token, extract) => {
  const url = `/Extract`;
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify(extract),
    };
    const response = await fetch(baseurl + url, requestOptions);
    if (!response.ok) {
      return response;
    } else {
      return await response.text();
    }
  } catch {
    throw new Error(
      `Error al obtener los extractos, ${url} | id: ${extract.id}`
    );
  }
};

export const deleteExtract = async (token, idExtract) => {
  const url = `/Extract/${idExtract}`;
  try {
    const response = await fetch(baseurl + url, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token },
    });
    if (!response.ok) {
      return response;
    } else {
      return await response.text();
    }
  } catch {
    throw new Error(`Error al eliminar extracto, ${url}`);
  }
};

export const getResumesByBankAndBranchOffice = async (
  token,
  idbank,
  idBranchOffice
) => {
  const url = `/Resume/Bank/${idbank}/BranchOffice/${idBranchOffice}`;
  try {
    console.log(`🦅 ~ service.js ~ ${url}`);
    const response = await fetch(baseurl + url, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
    if (!response.ok) {
      return response;
    } else {
      return await response.json();
    }
  } catch {
    throw new Error(`Error al obtener el resume, ${url}`);
  }
};

export const getResumesByBank = async (token, idbank) => {
  const url = `/Resume/Bank/${idbank}`;
  try {
    console.log(`🦅 ~ service.js ~ ${url}`);
    const response = await fetch(baseurl + url, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
    if (!response.ok) {
      return response;
    } else {
      return await response.json();
    }
  } catch {
    throw new Error(`Error al obtener el resume, ${url}`);
  }
};

export const postLogin = async (member) => {
  const url = `/Member/Login`;
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(member),
    };
    const response = await fetch(baseurl + url, requestOptions);
    if (!response.ok) {
      return response;
    } else {
      return await response.json();
    }
  } catch {
    throw new Error(
      `Error al obtener el token, ${url} | email: ${member.email} , password: ${member.password}`
    );
  }
};

export const getInfoLogin = async (token) => {
  const url = `/Member/GetInfo`;
  try {
    console.log(`🦅 ~ service.js ~ getInfoLogin ~ ${url}`);
    const response = await fetch(baseurl + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      return response;
    } else {
      return await response.json();
    }
  } catch {
    throw new Error("error al obtener el usuario: " + token);
  }
};
