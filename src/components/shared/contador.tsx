import { useEffect, useRef } from "react";

const Contador: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpia el contenedor (si React rerenderiza)
    containerRef.current.innerHTML = `
      <a href="https://www.free-counters.org/">powered by Free-Counters.org</a>
    `;

    // Script 1
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src =
      "https://www.freevisitorcounters.com/auth.php?id=90566c52eb2a847b5f03f6ae293dfdf9cf1e926e";
    script1.async = true;
    containerRef.current.appendChild(script1);

    // Script 2
    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "https://www.freevisitorcounters.com/en/home/counter/1452531/t/2";
    script2.async = true;
    containerRef.current.appendChild(script2);
  }, []);

  return <div ref={containerRef}></div>;
};

export default Contador;
