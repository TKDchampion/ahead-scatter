export async function getDataCSV(name: string) {
  try {
    const url = `${process.env["NEXT_PUBLIC_HOST"]}/${name}.csv`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error fetching the CSV file:", error);
    return null;
  }
}
