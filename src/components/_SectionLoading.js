import React from 'react';

function SectionLoading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <section className="section">
      <div className="container content has-text-centered">
        <span className="icon is-medium">
          <i className="fas fa-spinner fa-2x fa-spin"></i>
        </span>
      </div>
    </section>
  );
}

export default SectionLoading;
