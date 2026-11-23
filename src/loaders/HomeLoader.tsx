import { redirect, type LoaderFunctionArgs } from "react-router";

export function homeLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "";

  if (VALID_TABS.includes(tab) && !isNaN(Number(page))) return null;

  if (!tab || !VALID_TABS.includes(tab)) url.searchParams.set("tab", "all");

  if ((!page || isNaN(Number(page))) && !TABS_WITHOUT_PAGINATION.includes(tab))
    url.searchParams.set("page", "1");

  return redirect(url.pathname + url.search);
}
