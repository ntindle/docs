export default function githubLookup(owner, repo, branch, path, startMarker, endMarker,branch,language){
  
if (typeof document === "undefined") {
    return null;
  }

  try {
    const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`);
    const text = await response.text();

    let codeContent = '';

    if (startMarker && endMarker) {
      // Extract content between markers
      const parts = text.split(startMarker);
      if (parts.length > 1) {
        const endParts = parts[1].split(endMarker);
        if (endParts.length > 0) {
          codeContent = endParts[0].trim();
        }
      }
    } else {
      // Use the entire file if no markers specified
      codeContent = text;
    }

    // Return the code block wrapped in pre and code tags
    return (
      <pre>
        <code className={`language-${language}`}>
          {codeContent}
        </code>
      </pre>
    );
  } catch (error) {
    return (
      <div className="error">
        Error loading code from GitHub: {error.message}
      </div>
    );
  }
}