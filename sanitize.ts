import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML produced by the dashboard's rich-text editor before it is
 * rendered on the public site via dangerouslySetInnerHTML. This strips
 * <script> tags, inline event handlers (onclick, onerror, ...), javascript:
 * URLs, and other XSS vectors while preserving the formatting tags the
 * editor actually produces (headings, bold/italic, lists, links, images).
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'span', 'div',
      'code', 'pre', 'sub', 'sup', 'hr',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'style', 'dir'],
    ALLOW_DATA_ATTR: false,
  });
}
