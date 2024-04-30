import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  items: Array<{
    id: string;
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }>
}

export default function Breadcrumb({items}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <div className={styles.breadcrumb}>
        {items.map((item, index) => (
          <>
            <button
              key={item.id}
              className={styles.item}
              onClick={item.onClick}
            >
              {item.label}
              {item.isActive && <div className={styles.outline} />}
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