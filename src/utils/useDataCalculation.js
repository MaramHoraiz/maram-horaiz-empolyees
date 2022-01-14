import { useState, useEffect } from 'react';

/**
 * custom Hook to group array of data by projectid, and calculate max duration between employees
 * @param {array} data array of data file
 * @returns sample object {
   projectId: {
          overlap: max duration between 2 employees,
          emp1: employeeId1,
          emp2: employeeId2,
          data: [],
        };
 }
 */
export function useDataCalculation(data) {
  const [dataObj, setDataObj] = useState(null);

  useEffect(() => {
    const groupedProjects = data.reduce((projects, emp) => {
      let project = projects[emp[1]];
      if (!project) {
        project = projects[emp[1]] = {
          overlap: 0,
          emp1: 0,
          emp2: 0,
          data: [],
        };
      }

      project.data.forEach((d) => {
        const overlap = compareDiff(d[2], d[3], emp[2], emp[3]);
        if (overlap > project.overlap) {
          project.overlap = overlap;
          project.emp1 = d[0];
          project.emp2 = emp[0];
        }
      });

      project.data.push(emp);
      return projects;
    }, {});

    const deObjectify = Object.entries(groupedProjects).map(
      ([projectId, { emp1, emp2, overlap }]) => ({
        emp1,
        emp2,
        projectId,
        overlap,
      })
    );
    setDataObj(deObjectify);
  }, [data]);

  /**
   * compare start and end dates of 2 employees to calculate duration
   * @param {*} emp1StartDate
   * @param {*} emp1EndDate
   * @param {*} emp2StartDate
   * @param {*} emp2EndDate
   * @returns
   */
  const compareDiff = (
    emp1StartDate,
    emp1EndDate,
    emp2StartDate,
    emp2EndDate
  ) => {
    const startDatEmp1 = new Date(emp1StartDate);
    const endDatEmp1 =
      emp1EndDate === null ? new Date() : new Date(emp1EndDate);
    const startDatEmp2 = new Date(emp2StartDate);
    const endDatEmp2 =
      emp2EndDate === null ? new Date() : new Date(emp2EndDate);

    const start = startDatEmp1 < startDatEmp2 ? startDatEmp2 : startDatEmp1;
    const end = endDatEmp1 < endDatEmp2 ? endDatEmp1 : endDatEmp2;

    if (end >= start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };
  return dataObj;
}
