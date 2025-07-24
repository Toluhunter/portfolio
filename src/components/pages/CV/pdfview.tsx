export const PdfView = () => {
    const cvUrl = "https://assets.toluhunter.com/CV/Tolulope-Fakoya.pdf";
    const cvFileName = "Tolulope-Fakoya-CV.pdf";
    return (
        <section className="min-h-screen pt-25 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl rounded-lg shadow-xl p-6">
                {/* Top Download Button */}
                <div className="flex justify-center mb-6">
                    <a
                        href={cvUrl}
                        download={cvFileName}
                        className="bg-callout hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Download CV (PDF)
                    </a>
                </div>

                {/* CV Preview */}
                <div className="w-full h-[75vh] md:h-[85vh] lg:h-[90vh] relative overflow-hidden rounded-lg border-2 border-gray-200">
                    {/* Using iframe to embed the PDF. Note: Some browsers/devices might not display PDFs directly in iframes. */}
                    <iframe
                        src={cvUrl}
                        title="Tolulope Fakoya CV Preview"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        // Fallback for browsers that might not display iframes or PDFs
                        onError={(e) => {
                            console.error("Error loading PDF iframe:", e);
                            // You could display a message to the user here instead of the iframe
                            const target = e.target as HTMLIFrameElement;
                            if (target) {
                                target.style.display = 'none'; // Hide the broken iframe
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-full text-center p-4">
                        <p class="text-lg text-gray-600 mb-4">
                          Your browser might not support direct PDF preview in this window.
                        </p>
                        <p class="text-md text-gray-500">
                          Please use the "Download CV" button to view the document.
                        </p>
                      </div>
                    `;
                                }
                            }
                        }}
                    >
                        <p className="p-4 text-center text-gray-600">
                            Your browser does not support iframes or direct PDF viewing. Please use the download link below.
                        </p>
                    </iframe>
                </div>

                {/* Bottom Download Button */}
                <div className="flex justify-center mt-6">
                    <a
                        href={cvUrl}
                        download={cvFileName}
                        className="bg-callout hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Download CV (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
}