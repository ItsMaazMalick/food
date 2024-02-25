"use server";

// * OK: -> DELETE COOKIE
export async function deleteCookie() {
  const res = await fetch("http://localhost:3000/api/v1/deleteCookie", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
