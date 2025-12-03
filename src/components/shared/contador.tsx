import { useEffect } from "react";

export function Contador() {
  useEffect(() => {
    // Crea el primer script dinámicamente
    const script1 = document.createElement("script");
    script1.src = "https://www.freevisitorcounters.com/auth.php?id=90566c52eb2a847b5f03f6ae293dfdf9cf1e926e";
    script1.async = true;
    document?.getElementById("contador")?.appendChild(script1);

    // Crea el segundo script dinámicamente
    const script2 = document.createElement("script");
    script2.src = "https://www.freevisitorcounters.com/en/home/counter/1452531/t/2";
    script2.async = true;
    document?.getElementById("contador")?.appendChild(script2);
  }, []);

  return (
    <div id="contador">
      <a href="https://www.free-counters.org/">powered by Free-Counters.org</a>
    </div>
  );
}


