import React, { useEffect, useState } from "react";
import { useSectionTypes } from "@/hooks/useSectionTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import NextImage from "next/image";
import { useImageDelete, useImageUpload } from "@/hooks/useImageUpload";
import { produce } from "immer";

export default function DashboardAddNewSection({
  item,
  active,
  setActive,
  setItem,
}) {
  const [section, setSection] = useState({
    title: "",
    jsxContent: {},
  });

  const { data: sectionTypes, loading: loadingSectionTypes } =
    useSectionTypes();

  const [choosenSectionType, setChoosenSectionType] = useState(null);

  const addSectionToItemJSXContent = (section) => {
    setItem(
      produce((draft) => {
        draft.sections.push(section);
      })
    );
    setSection({
      title: "",
      jsxContent: {},
    });
    setActive(false);
  };

  const { uploadImages, uploadingImages } = useImageUpload();
  const { deleteImage } = useImageDelete();

  const handleUploadImages = async (e, path) => {
    const files = e.target.files;
    const imageKey = await uploadImages(files);
    setSection(
      produce((draft) => {
        let current = draft.jsxContent;
        path.forEach((index, i) => {
          if (i === path.length - 1) {
            current.children[index].data.src = imageKey;
          } else {
            current = current.children[index];
          }
        });
      })
    );
  };

  const handleInputChange = (e, path) => {
    const value = e.target.value;
    setSection(
      produce((draft) => {
        let current = draft.jsxContent;
        path.forEach((index, i) => {
          if (i === path.length - 1) {
            current.children[index].data.text = value;
          } else {
            current = current.children[index];
          }
        });
      })
    );
  };

  const textElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"];

  const generateSectionJSXInputs = (jsxContent, path = []) => {
    if (!jsxContent) return null;

    return jsxContent.children?.map((element, index) => {
      const currentPath = [...path, index.toString()];

      if (element.type === "img") {
        console.log("element.data.src:", element.data.src);

        return (
          <div className="form-row-item" key={currentPath.join("-")}>
            <label htmlFor={currentPath.join("-")}>{element.data.msg}</label>
            <input
              type="file"
              id={currentPath.join("-")}
              onChange={(e) => handleUploadImages(e, currentPath)}
            />
            {element.data.src && (
              <div>
                <NextImage
                  src={"/uploads/" + element.data.src}
                  alt={element.data.alt}
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (element.data.src !== "placeholder-image.svg") {
                      deleteImage(element.data.src);
                      handleInputChange({ target: { value: "" } }, currentPath);
                    } else {
                      alert(
                        "Ova slika ne može biti obrisana. Slika je placeholder."
                      );
                    }
                  }}
                >
                  Delete Image
                </button>
              </div>
            )}
          </div>
        );
      } else if (element.data && textElements.includes(element.type)) {
        return (
          <div className="form-row-item" key={currentPath.join("-")}>
            <label htmlFor={currentPath.join("-")}>{element.data.msg}</label>
            <input
              type="text"
              id={currentPath.join("-")}
              value={element.data.text || ""}
              onChange={(e) => handleInputChange(e, currentPath)}
            />
          </div>
        );
      } else if (element.children) {
        return (
          <div className="form-row" key={currentPath.join("-")}>
            {generateSectionJSXInputs(element, currentPath)}
          </div>
        );
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    console.log("section:", section);
  }, [section]);

  useEffect(() => {
    console.log("item.sections:", item.sections);
  }, [item.sections]);

  return (
    <>
      <div
        className={
          active
            ? "dashboard-add-new-section active"
            : "dashboard-add-new-section"
        }
      >
        <div className="form-row">
          <h5>Dodajte sekciju</h5>
        </div>
        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="sections">Naslov</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                setSection({ ...section, title: e.target.value })
              }
              placeholder="Unesite naslov sekcije"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="sections">Izaberite tip sekcije</label>
            <div className="section-types">
              {loadingSectionTypes ? (
                <LoadingSpinner />
              ) : (
                sectionTypes?.map((sectionType) => (
                  <button
                    key={sectionType.id}
                    onClick={() => {
                      if (sectionType.id === choosenSectionType?.id) {
                        setChoosenSectionType(null);
                        setSection({ ...section, jsxContent: {} });
                      } else {
                        setChoosenSectionType(sectionType);
                        console.log("Selected section type:", sectionType);
                        setSection({
                          ...section,
                          jsxContent: sectionType.jsxContent,
                        });
                      }
                    }}
                    className={`section-type ${
                      choosenSectionType?.id === sectionType.id ? "active" : ""
                    }`}
                    type="button"
                  >
                    <NextImage
                      src={"/uploads/" + sectionType.image}
                      width={100}
                      height={100}
                      alt="Slika tipa sekcije"
                    />
                    <span>{sectionType.title}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {choosenSectionType && (
          <>{generateSectionJSXInputs(section.jsxContent)}</>
        )}

        <div className="dashboard-add-new-section-bottom">
          <button
            className="btn"
            onClick={() => {
              setActive(false);
              setSection({
                title: "",
                jsxContent: {},
              });
            }}
            type="button"
          >
            Odustani
          </button>
          <button
            className="btn"
            onClick={() => addSectionToItemJSXContent(section)}
            type="button"
          >
            Dodaj sekciju na blog
          </button>
        </div>
      </div>
    </>
  );
}
