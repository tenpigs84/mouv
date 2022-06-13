import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort' && key !== 'filter') {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort) {
      req.sort.forEach((val: any) => {
        options = options.append('sort', val);
      });
    }
    if (req.filter) {
      // 遍历对象
      Object.keys(req.filter).forEach(key => {
        // 遍历数组
        if (key === 'jhiCommonSearchKeywords') {
          options = options.append(key, req.filter[key]);
        } else {
          for (const value of req.filter[key]) {
            options = options.append(key, value);
          }
        }
      });
    }
  }
  return options;
};
