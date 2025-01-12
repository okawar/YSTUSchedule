import React from 'react';

export default function Cell({ data, schedule, timeSlot, weekDay, weeks }) {
  const { selectedData, handleClick } = data;

  const isCellBusyBySelected = (cells) => {
    const selectedTeachers = selectedData.teachersFromCheckBox.map(teacher => teacher.id);
    const selectedGroups = selectedData.groupsFromCheckBox.map(group => group.id);
    const selectedAuditories = selectedData.auditoriesFromCheckBox.map(auditory => auditory.id);

    return cells.some(cell => {
      const isSelectedTeacher = selectedTeachers.includes(cell.teacherId);
      const isSelectedGroup = selectedGroups.includes(cell.groupId);
      const isSelectedAuditory = selectedAuditories.includes(cell.auditoryId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return (isSelectedTeacher && isSelectedGroup && isSelectedAuditory && isInWeeks);
    });
  };

  const isCellBusyByTeacherAndGroup = (cells) => {
    const selectedTeachers = selectedData.teachersFromCheckBox.map(teacher => teacher.id);
    const selectedGroups = selectedData.groupsFromCheckBox.map(group => group.id);

    return cells.some(cell => {
      const isSelectedTeacher = selectedTeachers.includes(cell.teacherId);
      const isSelectedGroup = selectedGroups.includes(cell.groupId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return (isSelectedTeacher && isSelectedGroup && isInWeeks);
    });
  };

  const isCellBusyByTeacherAndAuditory = (cells) => {
    const selectedTeachers = selectedData.teachersFromCheckBox.map(teacher => teacher.id);
    const selectedAuditories = selectedData.auditoriesFromCheckBox.map(auditory => auditory.id);

    return cells.some(cell => {
      const isSelectedTeacher = selectedTeachers.includes(cell.teacherId);
      const isSelectedAuditory = selectedAuditories.includes(cell.auditoryId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return (isSelectedTeacher && isSelectedAuditory && isInWeeks);
    });
  };

  const isCellBusyByGroupAndAuditory = (cells) => {
    const selectedGroups = selectedData.groupsFromCheckBox.map(group => group.id);
    const selectedAuditories = selectedData.auditoriesFromCheckBox.map(auditory => auditory.id);

    return cells.some(cell => {
      const isSelectedGroup = selectedGroups.includes(cell.groupId);
      const isSelectedAuditory = selectedAuditories.includes(cell.auditoryId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return (isSelectedGroup && isSelectedAuditory && isInWeeks);
    });
  };

  const isCellBusyByTeacher = (cells) => {
    const selectedTeachers = selectedData.teachersFromCheckBox.map(teacher => teacher.id);

    return cells.some(cell => {
      const isSelectedTeacher = selectedTeachers.includes(cell.teacherId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return isSelectedTeacher && isInWeeks;
    });
  };

  const isCellBusyByGroup = (cells) => {
    const selectedGroups = selectedData.groupsFromCheckBox.map(group => group.id);

    return cells.some(cell => {
      const isSelectedGroup = selectedGroups.includes(cell.groupId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return isSelectedGroup && isInWeeks;
    });
  };

  const isCellBusyByAuditory = (cells) => {
    const selectedAuditories = selectedData.auditoriesFromCheckBox.map(auditory => auditory.id);

    return cells.some(cell => {
      const isSelectedAuditory = selectedAuditories.includes(cell.auditoryId);

      const isInWeeks = weeks.split(',').some(weekRange => {
        const [start, end] = weekRange.split('-').map(Number);
        const cellWeeks = cell.week.split('-').map(Number);
  
        const cellStart = cellWeeks[0];
        const cellEnd = cellWeeks[1] || cellWeeks[0];
        const rangeStart = start;
        const rangeEnd = end || start;
  
        return cellStart <= rangeEnd && cellEnd >= rangeStart;
      });

      return isSelectedAuditory && isInWeeks;
    });
  };

  const getCellStyle = (cells) => {
    if (cells.length === 0) {
      return { backgroundColor: 'green', color: 'white' };
    }
    if (isCellBusyBySelected(cells)) {
      return { backgroundColor: 'red', color: 'white' };
    } else if (isCellBusyByTeacherAndGroup(cells) || isCellBusyByTeacherAndAuditory(cells) || isCellBusyByGroupAndAuditory(cells)) {
      return { backgroundColor: 'orange', color: 'black' };
    } else if (isCellBusyByTeacher(cells)) {
      return { backgroundColor: 'yellow', color: 'black' };
    } else if (isCellBusyByAuditory(cells)) {
      return { backgroundColor: 'blue', color: 'white' };
    } else if (isCellBusyByGroup(cells)) {
      return { backgroundColor: 'purple', color: 'white' };
    } else {
      return { backgroundColor: 'green', color: 'white' };
    }
  };

  const getCellContent = (cells) => {
    if (cells.length === 0) {
      return 'Свободно';
    }
    if (isCellBusyBySelected(cells)) {
      return 'Занято';
    } else if (isCellBusyByTeacherAndGroup(cells)) {
      return 'Выбранный преподаватель занимает группу (аудитория не совпадает с выбранной)';
    } else if (isCellBusyByTeacherAndAuditory(cells)) {
      return 'Выбранный (-ые) преподаватель (-ли) занимают аудиторию (группа не совпадает с выбранной)';
    } else if (isCellBusyByGroupAndAuditory(cells)) {
      return 'Группа и аудитория заняты другим преподавателем';
    } else if (isCellBusyByTeacher(cells)) {
      return 'Выбранный (-ые) преподаватель (-ли) занят (-ы)';
    } else if (isCellBusyByAuditory(cells)) {
      return 'Аудитория занята другим преподавателем';
    } else if (isCellBusyByGroup(cells)) {
      return 'Группа занята другим преподавателем';
    } else {
      return 'Свободно';
    }
  };

  const getBusyWeeksRange = (cells) => {
    const busyWeeks = [];
    cells.forEach(cell => {
      const [start, end] = cell.week.split('-').map(Number);
      for (let week = start; week <= (end || start); week++) {
        busyWeeks.push(week);
      }
    });
    if (busyWeeks.length === 0) return '';
    const minWeek = Math.min(...busyWeeks);
    const maxWeek = Math.max(...busyWeeks);
    if(minWeek == maxWeek) return `(${minWeek})`
    return `(${minWeek}-${maxWeek})`;
  };

  const cells = schedule.filter(cell =>
    cell.time === timeSlot &&
    cell.day === weekDay
  );

  const isCellFree = (cells) => {
    return !isCellBusyBySelected(cells) &&
           !isCellBusyByTeacherAndGroup(cells) &&
           !isCellBusyByTeacherAndAuditory(cells) &&
           !isCellBusyByGroupAndAuditory(cells) &&
           !isCellBusyByTeacher(cells) &&
           !isCellBusyByAuditory(cells) &&
           !isCellBusyByGroup(cells);
  };

  return (
    <td style={cells[0]?.style || getCellStyle(cells)} onClick={() => handleClick(cells[0])}>
      {getCellContent(cells)}
      <br />
      {!isCellFree(cells) && getBusyWeeksRange(cells)}
    </td>
  );
}
