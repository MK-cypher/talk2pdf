"use client";
import {Document, Page} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {pdfjs} from "react-pdf";
import {useEffect, useRef, useState} from "react";
import {ChevronDown, ChevronUp, Minus, Plus} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfRenderer({url, mobile}: {url: string; mobile?: boolean}) {
  const [width, setWidth] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pageInput, setPageInput] = useState(1);
  const [scale, setScale] = useState(100);
  const [scaleInput, setScaleInput] = useState("100");

  const pageRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const containerRef = useRef(null);

  const handleResize = () => {
    console.log("resize");
    if (sectionRef.current) {
      const w = sectionRef.current.clientWidth - 5;
      setWidth(w);
    }
  };
  useEffect(() => {
    if (sectionRef.current && !mobile) {
      new ResizeObserver(handleResize).observe(sectionRef.current);
    }
    if (mobile) {
      handleResize();
    }
  }, []);

  function init() {
    const sectionContainer = sectionRef.current;
    if (sectionContainer) {
      const isTop = sectionContainer.scrollHeight - sectionContainer.clientHeight - 2 + sectionContainer.scrollTop < 0;
      if (isTop) {
        setPageInput(1);
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNumber = parseInt((entry.target as HTMLDivElement).dataset.pageNumber || "1");
            setCurrentPage(pageNumber);
            setPageInput(pageNumber);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    Object.values(pageRefs.current).forEach((ref) => {
      if (ref instanceof Element) observer.observe(ref);
    });
    const timeoutId = setTimeout(() => {
      init();
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pages]);

  const scrollToPage = (pageNumber: number) => {
    const pageRef = pageRefs.current[pageNumber];
    if (pageRef) {
      pageRef.scrollIntoView({behavior: "smooth", block: "start"});
    }
  };

  // const url ="";
  return (
    <div className="w-full" ref={sectionRef}>
      <div className="h-14 p-2 flex justify-between items-center gap-2">
        <div></div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (currentPage > 1) {
                const newPage = currentPage - 1;
                scrollToPage(newPage);
              }
            }}
            disabled={currentPage == 1}
          >
            <ChevronDown />
          </button>
          <input
            onKeyDown={(e) => {
              const value = e.key;
              const pass = ["e", "-", "+", "=", "."];
              if (pass.includes(value)) {
                e.preventDefault();
              } else if (e.code === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={(e) => {
              let val = Number(e.target.value);
              if (val > pages) {
                val = pages;
              }
              if (val < 1) {
                val = 1;
              }
              setPageInput(val);
              scrollToPage(val);
            }}
            onChange={(e) => {
              setPageInput(Number(e.target.value));
            }}
            type="number"
            value={pageInput}
            readOnly={false}
            className=" h-8 rounded-sm"
            style={{width: `${String(pages).length + 1}rem`}}
          />{" "}
          <span>/</span> <span>{pages}</span>
          <button
            onClick={() => {
              if (currentPage < pages) {
                const newPage = currentPage + 1;
                scrollToPage(newPage);
              }
            }}
            disabled={currentPage == pages}
          >
            <ChevronUp />
          </button>
        </div>
        {!mobile ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (scale > 10) {
                  setScale((prev) => prev - 5);
                  setScaleInput((prev) => String(Number(prev) - 5));
                }
              }}
              disabled={scale <= 10}
            >
              <Minus />
            </button>

            <input
              onKeyDown={(e) => {
                const value = e.key;
                const pass = ["e", "-", "+", "=", "."];
                if (pass.includes(value)) {
                  e.preventDefault();
                } else if (e.code === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                let val = "";
                for (const c of value) {
                  if (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57) {
                    val += c;
                  }
                }
                if (Number(val) >= 200) {
                  val = "200";
                }
                if (Number(val) <= 10) {
                  val = "10";
                }

                setScale(Number(val));
                setScaleInput(`${val}`);
              }}
              value={`${scaleInput}%`}
              onChange={(e) => {
                setScaleInput(e.target.value);
              }}
              readOnly={false}
              type="text"
              style={{width: "4rem"}}
            />
            <button
              onClick={() => {
                if (scale < 200) {
                  setScale((prev) => prev + 5);
                  setScaleInput((prev) => String(Number(prev) + 5));
                }
              }}
              disabled={scale >= 200}
            >
              <Plus />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="overflow-y-auto h-[calc(100vh-9.5rem)] max-w-[100svw]">
        <Document onLoadSuccess={({numPages}) => setPages(numPages)} file={url} className={"w-full overflow-y-auto"}>
          {new Array(pages).fill(0).map((item, i) => (
            // @ts-ignore
            <div key={i + 1} ref={(el) => (pageRefs.current[i + 1] = el)} data-page-number={i + 1}>
              <Page key={i} pageNumber={i + 1} width={width} scale={scale / 100} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
