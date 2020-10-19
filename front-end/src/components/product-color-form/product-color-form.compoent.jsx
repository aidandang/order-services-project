import React from 'react';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function AddColorForm({ 
  formData, 
  errors, 
  onInputChange
}) {

  return <>
    <li className={liClassName}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="color">Color (*)</label>
            <input 
              type="text" 
              className="form-control" 
              name="color" 
              value={formData.color}
              onChange={onInputChange}
            />
            <small>Copy and paste color from the product's website.</small>
            {errors.color.length > 0 ? <p className="mt-2 text-danger">{errors.color}</p> : null}
          </div>
        </div>
      </div>
    </li>

    <li className={liClassName}>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input 
              type="text" 
              className="form-control" 
              name="url" 
              value={formData.url}
              onChange={onInputChange}
            />
            <small>Copy and paste url from the product's website.</small>
            {errors.url.length > 0 ? <p className="mt-2 text-danger">{errors.url}</p> : null}
          </div>
        </div>
      </div>
    </li>

    <li className={liClassName}>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input 
              type="text" 
              className="form-control" 
              name="image" 
              value={formData.image}
              onChange={onInputChange}
            />
            <small>Copy and paste image address from the product's website.</small>
            {errors.image.length > 0 ? <p className="mt-2 text-danger">{errors.image}</p> : null}
          </div>
        </div>
      </div>
    </li>       
  </>
}