import React, { useState } from 'react';

interface PossibleResponseGroup {
  title: string;
  possibleResponses: string[];
}

const ClassificationQuestionCreation = () => {
  const [question, setQuestion] = useState<string>('[This is the stem.]');
  const [columnCount, setColumnCount] = useState<number>(2);
  const [rowCount, setRowCount] = useState<number>(1);
  const [columnTitles, setColumnTitles] = useState<string[]>(['COLUMN 1', 'COLUMN 2']);
  const [rowTitles, setRowTitles] = useState<string[]>([]);
  const [possibleResponsesGroups, setPossibleResponsesGroups] = useState<PossibleResponseGroup[]>([
    {
      title: 'Group 1',
      possibleResponses: ['[Choice A]', '[Choice B]', '[Choice C]', '[Choice D]'],
    },
  ]);
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [note, setNote] = useState<number>(0);
  const [showDragHandle, setShowDragHandle] = useState<boolean>(true);
  const [duplicateResponses, setDuplicateResponses] = useState<boolean>(false);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  const handleAddColumnTitle = () => {
    const newTitles = [...columnTitles, 'New Column'];
    setColumnTitles(newTitles);
  };

  const generateColumnTitles = () => {
    const titles: JSX.Element[] = [];

    for (let i = 0; i < columnTitles.length; i++) {
      titles.push(
        <li key={i}>
          <label>{columnTitles[i]}</label>
        </li>
      );
    }

    return titles;
  };

  const handleAddRowTitle = () => {
    const newTitles = [...rowTitles, 'New Row'];
    setRowTitles(newTitles);
  };

  const generateRowTitles = () => {
    const titles: JSX.Element[] = [];

    for (let i = 0; i < rowTitles.length; i++) {
      titles.push(
        <li key={i}>
          <label>{rowTitles[i]}</label>
        </li>
      );
    }

    return titles;
  };

  const handleRemoveColumnTitle = () => {
    if (columnTitles.length > 1) {
      const newTitles = columnTitles.slice(0, -1);
      setColumnTitles(newTitles);
    }
  };

  const handleRemoveRowTitle = () => {
    if (rowTitles.length > 1) {
      const newTitles = rowTitles.slice(0, -1);
      setRowTitles(newTitles);
    }
  };

  const handleCorrectAnswerChange = (groupIndex: number, responseIndex: number) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[groupIndex * columnCount + responseIndex] = !correctAnswers[groupIndex * columnCount + responseIndex];
    setCorrectAnswers(newCorrectAnswers);
  };

  const handlePossibleResponsesChange = (groupIndex: number, responseIndex: number, value: string) => {
    const newGroups = [...possibleResponsesGroups];
    newGroups[groupIndex].possibleResponses[responseIndex] = value;
    setPossibleResponsesGroups(newGroups);
  };

  const removePossibleResponseGroup = (groupIndex: number) => {
    const newGroups = [...possibleResponsesGroups];
    newGroups.splice(groupIndex, 1);
    setPossibleResponsesGroups(newGroups);
  };

  const removePossibleResponse = (groupIndex: number, responseIndex: number) => {
    const newGroups = [...possibleResponsesGroups];
    newGroups[groupIndex].possibleResponses.splice(responseIndex, 1);
    setPossibleResponsesGroups(newGroups);
  };

  const addPossibleResponseGroup = () => {
    const newGroup: PossibleResponseGroup = {
      title: 'New Group',
      possibleResponses: [],
    };
    const newGroups = [...possibleResponsesGroups]
      setPossibleResponsesGroups(newGroups);
    };
  
    const addPossibleResponse = (groupIndex: number) => {
      const newGroups = [...possibleResponsesGroups];
      newGroups[groupIndex].possibleResponses.push('');
      setPossibleResponsesGroups(newGroups);
    };
  
    const generateTable = () => {
      const table: JSX.Element[] = [];
  
      const headerRow = columnTitles.map((title, index) => <th key={index}>{title}</th>);
      table.push(<tr key="header">{headerRow}</tr>);
  
      for (let i = 0; i < rowCount; i++) {
        const row: JSX.Element[] = [];
        for (let j = 0; j < columnCount; j++) {
          const cellIndex = i * columnCount + j;
  
          const responseOptions = possibleResponsesGroups.map((group, groupIndex) => (
            <option key={groupIndex} value={cellIndex + 1}>
              {group.possibleResponses[cellIndex] || ''}
            </option>
          ));
  
          row.push(
            <td key={j}>
              <select value={correctAnswers[cellIndex] ? '1' : '0'} onChange={() => handleCorrectAnswerChange(i, j)}>
                <option value="0">Incorrect</option>
                <option value="1">Correct</option>
              </select>
              <select value={cellIndex + 1} onChange={(e) => handlePossibleResponsesChange(i, j, e.target.value)}>
                {responseOptions}
              </select>
            </td>
          );
        }
  
        row.push(
          <td key="description">{description}</td>,
          <td key="imageUrl">{imageUrl}</td>,
          <td key="videoUrl">{videoUrl}</td>,
          <td key="note">{note}</td>
        );
        table.push(<tr key={i}>{row}</tr>);
      }
  
      return table;
    };
  
    const generatePossibleResponseLabels = () => {
      const labels: JSX.Element[] = [];
  
      for (let i = 0; i < possibleResponsesGroups.length; i++) {
        const group = possibleResponsesGroups[i];
  
        labels.push(
          <li key={i}>
            <label>{group.title}</label>
            <ul>
              {group.possibleResponses.map((response, responseIndex) => (
                <li key={responseIndex}>{response}</li>
              ))}
            </ul>
          </li>
        );
      }
  
      return labels;
    };
  
    return (
      <div className="classification-question-creation">
        <h2>classification</h2>
        <div>
          <label>Compose question</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={4} />
        </div>
        <div>
          <label>Column Count</label>
          <input
            type="number"
            value={columnCount}
            onChange={(e) => setColumnCount(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <label>Row Count</label>
          <input
            type="number"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <label>Column Titles</label>
          <ul>{generateColumnTitles()}</ul>
          <button onClick={handleAddColumnTitle}>Add</button>
          <button onClick={handleRemoveColumnTitle}>Remove</button>
        </div>
        <div>
          <label>Row Titles</label>
          <ul>{generateRowTitles()}</ul>
          <button onClick={handleAddRowTitle}>Add</button>
          <button onClick={handleRemoveRowTitle}>Remove</button>
        </div>
        <div>
          <h3>Group Possible Responses</h3>
          <ul>
            {possibleResponsesGroups.map((group, groupIndex) => (
              <li key={groupIndex}>
                <label>Group Title</label>
                <input
                  type="text"
                  value={group.title}
                  onChange={(e) => {
                    const newGroups = [...possibleResponsesGroups];
                    newGroups[groupIndex].title = e.target.value;
                    setPossibleResponsesGroups(newGroups);
                  }}
                />
                <button onClick={() => removePossibleResponseGroup(groupIndex)}>Remove Group</button>
                <ul>
                  <h4>Possible Responses</h4>
                  {group.possibleResponses.map((response, responseIndex) => (
                    <li key={responseIndex}>
                      <input
                        type="text"
                        value={response}
                        onChange={(e) => handlePossibleResponsesChange(groupIndex, responseIndex, e.target.value)}
                      />
                      <button onClick={() => removePossibleResponse(groupIndex, responseIndex)}>Remove Response</button>
                    </li>
                  ))}
                  <button onClick={() => addPossibleResponse(groupIndex)}>Add Response</button>
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={addPossibleResponseGroup}>Add Group</button>
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div>
          <label>Video URL</label>
          <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        </div>
        <div>
          <label>Note</label>
          <input type="number" value={note} onChange={(e) => setNote(Number(e.target.value))} />
        </div>
        <div>
          <h3>Question Table</h3>
          <div>
            <label>Show drag handle</label>
            <input
              type="checkbox"
              checked={showDragHandle}
              onChange={() => setShowDragHandle(!showDragHandle)}
            />
          </div>
          <div>
            <label>Duplicate responses</label>
            <input
              type="checkbox"
              checked={duplicateResponses}
              onChange={() => setDuplicateResponses(!duplicateResponses)}
            />
          </div>
          <div>
            <label>Shuffle options</label>
            <input
              type="checkbox"
              checked={shuffleOptions}
              onChange={() => setShuffleOptions(!shuffleOptions)}
            />
          </div>
          <table>
            <tbody>{generateTable()}</tbody>
          </table>
          <ul>{generatePossibleResponseLabels()}</ul>
        </div>
      </div>
    );
  };
  
  export default ClassificationQuestionCreation;
    