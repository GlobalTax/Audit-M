import { Phone } from 'lucide-react';
import { useTopBarOptional } from '../hooks/useTopBar';
import { GroupDropdown } from './GroupDropdown';
import { TopBarData } from '../types';
import { DEFAULT_DATA } from '../utils/defaults';
import { cn } from '../utils/cn';

interface LinkComponentProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

interface TopBarProps {
  /** Direct data prop for use without Provider */
  data?: TopBarData;
  /** Optional language switcher component */
  LanguageSwitcher?: React.ComponentType;
  /** Custom Link component (e.g., from react-router-dom) */
  LinkComponent?: React.ComponentType<LinkComponentProps>;
  /** Additional className */
  className?: string;
}

/**
 * Default link component - uses native anchor tags
 */
function DefaultLink({ to, children, className, style, onMouseEnter, onMouseLeave }: LinkComponentProps) {
  return (
    <a 
      href={to} 
      className={className} 
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

/**
 * TopBar component - fully independent, no external dependencies
 * Works with or without TopBarProvider
 */
export function TopBar({ 
  data: propData, 
  LanguageSwitcher, 
  LinkComponent = DefaultLink,
  className = '' 
}: TopBarProps) {
  const contextData = useTopBarOptional();
  const data = propData || contextData || DEFAULT_DATA;

  const { config, companies, links } = data;

  // Don't render if no meaningful content
  if (!config.phoneNumber && links.length === 0 && companies.length === 0) {
    return null;
  }

  // Dynamic styles
  const containerStyle: React.CSSProperties = {
    backgroundColor: config.backgroundColor,
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
  };

  const textStyle: React.CSSProperties = {
    color: config.textColor,
  };

  const separatorStyle: React.CSSProperties = {
    color: config.textColor,
    opacity: 0.3,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = config.hoverColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = config.textColor;
  };

  return (
    <div 
      className={cn('h-10 hidden md:block fixed top-0 left-0 right-0 z-[60]', className)}
      style={containerStyle}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Companies + Links */}
        <div className="flex items-center gap-4">
          <GroupDropdown 
            companies={companies}
            textColor={config.textColor}
            hoverColor={config.hoverColor}
          />

          {links.length > 0 && (
            <>
              <span style={separatorStyle}>|</span>
              <nav className="flex items-center gap-4">
                {links.map((link, index) => (
                  <div key={link.id} className="flex items-center gap-4">
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors"
                        style={textStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <LinkComponent
                        to={link.href}
                        className="text-sm transition-colors"
                        style={textStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.label}
                      </LinkComponent>
                    )}
                    {index < links.length - 1 && (
                      <span style={separatorStyle}>|</span>
                    )}
                  </div>
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Right: Language + Phone */}
        <div className="flex items-center gap-4">
          {config.showLanguageSelector && LanguageSwitcher && (
            <LanguageSwitcher />
          )}

          {config.phoneNumber && (
            <>
              {config.showLanguageSelector && LanguageSwitcher && (
                <span style={separatorStyle}>|</span>
              )}
              <a
                href={config.phoneLink}
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={textStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{config.phoneNumber}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
