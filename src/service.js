const baseurl = "https://localhost:44377";

export const getBanks = async () => {
  const url = `/Bank`;
  try {
    console.log(`🦅 ~ service.js ~ getBanks ~ ${url}`);
    const response = await fetch(baseurl + url);
    return await response.json();
  } catch {
    throw new Error("error al obtener los bancos.");
  }
};

export const getBranchOffice = async () => {
  const url = `/BranchOffice`;
  try {
    console.log(`🦅 ~ service.js ~ getBranchOffice ~ ${url}`);
    const response = await fetch(baseurl + url);
    return await response.json();
  } catch {
    throw new Error(`error al obtener las sucursales, ${url}`);
  }
};

export const getExtractsByBank = async (idbank) => {
  const url = `/Extract/Bank/${idbank}`;
  try {
    console.log(`🦅 ~ service.js ~ getExtractsByBank ~ ${url}`);
    const response = await fetch(baseurl + url);
    return await response.json();
  } catch {
    throw new Error(`error al obtener los extractos con el banco ${idbank}`);
  }
};

export const putExtract = async (extract) => {
  const url = `/Extract`;
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

export const postExtract = async (extract) => {
  const url = `/Extract`;
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export const deleteExtract = async (idExtract) => {
  const url = `/Extract/${idExtract}`;
  try {
    const response = await fetch(baseurl + url, { method: "DELETE" });
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
  idbank,
  idBranchOffice
) => {
  const url = `/Resume/Bank/${idbank}/BranchOffice/${idBranchOffice}`;
  try {
    console.log(`🦅 ~ service.js ~ ${url}`);
    const response = await fetch(baseurl + url);
    if (!response.ok) {
      return response;
    } else {
      return await response.json();
    }
  } catch {
    throw new Error(`Error al obtener el resume, ${url}`);
  }
};

export const getResumesByBank = async (idbank) => {
  const url = `/Resume/Bank/${idbank}`;
  try {
    console.log(`🦅 ~ service.js ~ ${url}`);
    const response = await fetch(baseurl + url);
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
        "Content-Type": "application/json",
      },

      body: JSON.stringify(member),
    };
    const response = await fetch(baseurl + url, requestOptions);
    if (!response.ok) {
      return response;
    } else {
      return await response.text();
    }
  } catch {
    throw new Error(
      `Error al obtener el token, ${url} | email: ${member.email} , password: ${member.password}`
    );
  }
};
