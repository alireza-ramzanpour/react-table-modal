import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-modal'
import styles from './styles.module.css'

export const ExampleComponent = (props) => {

  const [cols, setCols] = useState([])
  const [data, setData] = useState([])
  const [editingData, setEditingData] = useState([]);
  const fieldRefs = useRef([])

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

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (rowData) => {
    setEditingData([rowData]);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const customStyles = {
    content: {
      width: '300px',
      height: '220px',
      marginTop: '20vh',
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: '#e8e8e8',
      boxShadow: '0 5px 30px rgba(70, 72, 77, 0.08)',
    },
  };

  // Modal Codes

  return (
    <div>
      <table className={props.theme}>
        <thead>
          <tr className={styles.headRow}>
            {
              cols.map((col) => (
                <th>{col}</th>
              ))
            }
            {props.deleteButton && <th>Delete</th>}
            {props.editButton && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {
            data.map((d, index) => (
              <tr key={index} className={styles.contentRow}>
                {
                  cols.map((col) => (
                    <td>{d[col]}</td>
                  ))
                }
                {props.deleteButton &&
                  <td>
                    <input type="button" value='delete' className={styles.deleteBtn} onClick={() => {
                      const newData = [...data.slice(0, index), ...data.slice(index + 1)];
                      setData(newData);
                    }} />
                  </td>
                }
                {
                  props.editButton &&
                  <td>
                    <input type="button" className={styles.tableBtn} value="edit" onClick={() => openModal({ ...d, index })} />
                  </td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>Enter the field</div>
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
                    className={styles.modalInput}
                    defaultValue={item[field]}
                  />
                )
              }
            })
          ))}
          <div className={styles.buttonWrapper}>
            <input type="button" className={`${styles.customButton} ${styles.okBtn}`} value="Ok" onClick={handleEditingData} />
            <input type="button" className={`${styles.customButton} ${styles.cancelBtn}`} value="Cancel" onClick={closeModal} />
          </div>
        </form>
      </Modal>
    </div>
  )
}
