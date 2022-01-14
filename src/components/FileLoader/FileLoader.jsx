import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import './style.css';

const fileTypes = ['docx'];

/**
 * React component to display drag and drop control to upload doc file
 * and retrieve its content
 * @param {callback fn} setGridData
 * @param {callback fn} setErrorMsg
 */
export default function FileLoader({ setGridData, setErrorMsg }) {
  const [file, setFile] = useState(null);

  /**
   *
   * @param {obj} e file object
   */
  const showFile = async (e) => {
    setFile(e);
    const reader = new FileReader();
    /**
     * retrieve file content to an array
     * @param {event} e
     */
    reader.onload = async (e) => {
      try {
        const content = e.target.result;
        var doc = new Docxtemplater(new PizZip(content), {
          delimiters: {
            start: '12op1j2po1j2poj1po',
            end: 'op21j4po21jp4oj1op24j',
          },
        });
        var text = doc.getFullText();
        var dataArray = JSON.parse('[' + text + ']');
        console.log('Data: ', dataArray);
        if (dataArray.length > 0) {
          setGridData(dataArray);
          setErrorMsg(null);
        } else {
          setErrorMsg('No Data to show');
          setGridData([]);
        }
      } catch (error) {
        setErrorMsg(error.message);
        setGridData([]);
      }
    };
    reader.readAsBinaryString(e);
  };

  return (
    <div className="file-loader__container">
      <FileUploader
        handleChange={(e) => {
          showFile(e);
        }}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file.name}` : 'no files uploaded yet'}</p>
    </div>
  );
}
