/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-10-19 20:43:09
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-12-20 11:02:36
 * @FilePath: \school-explorer\site\js\schools-list.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//Write a function that fills in the list with list item (`li`) elements for each school in an array
//Create a list element (unordered -- `ul`) in the HTML give it an id of `school-list`
import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';

  for (const school of schoolsToShow) {
    const html = `<li class="list-group-item">name:${school['name']}zip code:${school['Zip Code']} (Grades: ${school['Current Grade Span Served']})</li>`;
    const li = htmlToElement(html);
    schoolList.append(li);
  }
}

export {
  showSchoolsInList,
};
