import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  items: Array<{
    _id: string;
    name: string;
  }>
  active: string;
  onClick: (id: string) => void;
}

export default function Breadcrumb({items, onClick, active}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <div className={styles.breadcrumb}>
        {items.map((item, index) => (
          <>
            <button
              key={item._id}
              className={styles.item}
              onClick={() => onClick(item._id)}
            >
              {item.name}
              {active === item._id && <div className={styles.outline} />}
            </button>
            {index < items.length - 1 && (
              <div key={`separator-${index}`} className={styles.separator} />
            )}
          </>
        ))}
      </div>
    </nav>
  )
}