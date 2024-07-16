import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import styles from './styles.module.css';

export const DataTable = (props) => {

  const [cols, setCols] = useState([])
  const [data, setData] = useState([])
  const [editingData, setEditingData] = useState([]);
  const fieldRefs = useRef([])

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / props.rowsPerPage);
  const startIndex = (currentPage - 1) * props.rowsPerPage;
  const endIndex = startIndex + props.rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCols(props.cols)
    setData(props.data)
  }, [props])


  const handleEditingData = () => {
    const updatedData = data.map((item, i) => {
      if (i == editingData[0].index) {
        const updatedItem = { ...item };

        props.editField.forEach((field, index) => {
          updatedItem[field] = fieldRefs.current[index].type == 'checkbox' ? fieldRefs.current[index].checked ? 'Yes' : 'No' : fieldRefs.current[index].value;
        });
        return updatedItem;
      }
      return item;
    });

    setData(updatedData);
    closeModal();
  };


  // Modal Codes

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = (rowData) => {
    setEditingData([rowData])
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  // Modal Codes

  return (
    <div className={`${styles[props.theme]} ${styles.tableHolder}`}>
      <table>
        <thead className={styles.tableRowHeader}>
          <tr className={styles.headRow}>
            {
              cols.map((col) => (
                <th className={styles.tableHeader}>{col}</th>
              ))
            }
            <th className={styles.tableHeader}>operation</th>
          </tr>
        </thead>
        <tbody>
          {
            currentData.map((d, index) => (
              <tr key={index} className={styles.tableRowItems}>
                {
                  cols.map((col) => (
                    <td className={styles.tableCell}>{d[col]}</td>
                  ))
                }
                <td className={styles.buttonWrapper}>
                  {props.deleteButton &&
                    <FaTrash className={`${styles.deleteBtn} ${styles.icon} `} onClick={() => {
                      const newData = [...data.slice(0, index), ...data.slice(index + 1)];
                      setData(newData);
                    }} />
                  }
                  {
                    props.editButton &&
                    <FaEdit className={`${styles.tableBtn} ${styles.icon} `} onClick={() => openModal({ ...d, index })} />
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className={styles.tableFooter}>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber == 1 ||
            pageNumber == totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <div
                className={`${styles.button} ${pageNumber == currentPage ? styles.activeButton : styles.inactiveButton} `}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            )
          } else if (
            pageNumber == 2 ||
            pageNumber == totalPages - 1
          ) {
            return (
              <div className={styles.dotButton}>...</div>
            )
          }
        })}
      </div>

      {modalIsOpen &&
        <div className={styles.modal}>
          <div className={styles.modalBackground}></div>
          <div className={styles.modalContent}>
            <h2>Enter the field</h2>
            <form>
              {props.editField.map((field, index) => (
                editingData.map((item) => {
                  if (item[field] == "Yes" || item[field] == "No") {
                    return (
                      <div >
                        <input
                          type="checkbox"
                          ref={(element) => fieldRefs.current[index] = element}
                          defaultChecked={item[field] == 'Yes' ? true : false}
                        />
                        <span>{field}</span>
                      </div>
                    )
                  } else {
                    return (
                      <input
                        type="text"
                        ref={(element) => fieldRefs.current[index] = element}
                        className={styles[field]}
                        defaultValue={item[field]}
                      />
                    )
                  }
                })
              ))}
              <div className={styles.buttonWrapper}>
                <input type="button" className={`${styles.customButton} ${styles.okBtn} `} value="Ok" onClick={handleEditingData} />
                <input type="button" className={`${styles.customButton} ${styles.cancelBtn} `} value="Cancel" onClick={closeModal} />
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  )
}
