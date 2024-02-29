const baseurl = "https://localhost:44377";
export const getBanks = async () => {
    try {
        const response = await fetch(baseurl + '/Bank');
        return response.json();
    } catch {
        throw new Error('error al obtener los bancos.')
    }
}

export const getExtractsByBank = async (idbank) => {
  try {
    const response = await fetch(baseurl + "/Extract/Bank/" + idbank);
    return response.json();
  } catch {
    throw new Error(`error al obtener los extractos con el banco ${idbank}`);
  }
};