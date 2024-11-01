// Calculator Engine Class
class CalculatorEngine {
    constructor() {
        this.selectedType = 'Fraud Detection';
        this.hours = 5;
        this.enabledFeatures = new Set(['Red Flag Detection', 'Hidden Risks Identification', 'Cross-Document Analysis']);
        
        // Configuration for all analysis types
        this.ANALYSIS_TYPES = {
            'Fraud Detection': {
                ranges: [
                    { threshold: 5, multiplier: 2.85 },
                    { threshold: 10, multiplier: 2.45 },
                    { threshold: 15, multiplier: 2.15 },
                    { threshold: 20, multiplier: 1.95 },
                    { threshold: 25, multiplier: 1.75 },
                    { threshold: 30, multiplier: 1.55 },
                    { threshold: 35, multiplier: 1.35 },
                    { threshold: 40, multiplier: 1.15 }
                ],
                baseMultiplier: 1.2
            },
            'M&A Analysis': {
                ranges: [
                    { threshold: 5, multiplier: 3.15 },
                    { threshold: 10, multiplier: 2.75 },
                    { threshold: 15, multiplier: 2.45 },
                    { threshold: 20, multiplier: 2.25 },
                    { threshold: 25, multiplier: 2.05 },
                    { threshold: 30, multiplier: 1.85 },
                    { threshold: 35, multiplier: 1.65 },
                    { threshold: 40, multiplier: 1.45 }
                ],
                baseMultiplier: 1.4
            },
            'Financial Health': {
                ranges: [
                    { threshold: 5, multiplier: 2.95 },
                    { threshold: 10, multiplier: 2.55 },
                    { threshold: 15, multiplier: 2.25 },
                    { threshold: 20, multiplier: 2.05 },
                    { threshold: 25, multiplier: 1.85 },
                    { threshold: 30, multiplier: 1.65 },
                    { threshold: 35, multiplier: 1.45 },
                    { threshold: 40, multiplier: 1.25 }
                ],
                baseMultiplier: 1.3
            },
            'Compliance Analysis': {
                ranges: [
                    { threshold: 5, multiplier: 2.75 },
                    { threshold: 10, multiplier: 2.35 },
                    { threshold: 15, multiplier: 2.05 },
                    { threshold: 20, multiplier: 1.85 },
                    { threshold: 25, multiplier: 1.65 },
                    { threshold: 30, multiplier: 1.45 },
                    { threshold: 35, multiplier: 1.25 },
                    { threshold: 40, multiplier: 1.05 }
                ],
                baseMultiplier: 1.1
            },
            'Benchmarking': {
                ranges: [
                    { threshold: 5, multiplier: 3.05 },
                    { threshold: 10, multiplier: 2.65 },
                    { threshold: 15, multiplier: 2.35 },
                    { threshold: 20, multiplier: 2.15 },
                    { threshold: 25, multiplier: 1.95 },
                    { threshold: 30, multiplier: 1.75 },
                    { threshold: 35, multiplier: 1.55 },
                    { threshold: 40, multiplier: 1.35 }
                ],
                baseMultiplier: 1.3
            },
            'Corporate Vulnerabilities': {
                ranges: [
                    { threshold: 5, multiplier: 3.25 },
                    { threshold: 10, multiplier: 2.85 },
                    { threshold: 15, multiplier: 2.55 },
                    { threshold: 20, multiplier: 2.35 },
                    { threshold: 25, multiplier: 2.15 },
                    { threshold: 30, multiplier: 1.95 },
                    { threshold: 35, multiplier: 1.75 },
                    { threshold: 40, multiplier: 1.55 }
                ],
                baseMultiplier: 1.5
            },
            'Management & Governance': {
                ranges: [
                    { threshold: 5, multiplier: 2.65 },
                    { threshold: 10, multiplier: 2.25 },
                    { threshold: 15, multiplier: 1.95 },
                    { threshold: 20, multiplier: 1.75 },
                    { threshold: 25, multiplier: 1.55 },
                    { threshold: 30, multiplier: 1.35 },
                    { threshold: 35, multiplier: 1.15 },
                    { threshold: 40, multiplier: 0.95 }
                ],
                baseMultiplier: 1.0
            },
            'Legal & Litigation Review': {
                ranges: [
                    { threshold: 5, multiplier: 2.95 },
                    { threshold: 10, multiplier: 2.55 },
                    { threshold: 15, multiplier: 2.25 },
                    { threshold: 20, multiplier: 2.05 },
                    { threshold: 25, multiplier: 1.85 },
                    { threshold: 30, multiplier: 1.65 },
                    { threshold: 35, multiplier: 1.45 },
                    { threshold: 40, multiplier: 1.25 }
                ],
                baseMultiplier: 1.2
            },
            'Regulatory Compliance Review': {
                ranges: [
                    { threshold: 5, multiplier: 3.15 },
                    { threshold: 10, multiplier: 2.75 },
                    { threshold: 15, multiplier: 2.45 },
                    { threshold: 20, multiplier: 2.25 },
                    { threshold: 25, multiplier: 2.05 },
                    { threshold: 30, multiplier: 1.85 },
                    { threshold: 35, multiplier: 1.65 },
                    { threshold: 40, multiplier: 1.45 }
                ],
                baseMultiplier: 1.4
            },
            'Segment Reporting Analysis': {
                ranges: [
                    { threshold: 5, multiplier: 2.85 },
                    { threshold: 10, multiplier: 2.45 },
                    { threshold: 15, multiplier: 2.15 },
                    { threshold: 20, multiplier: 1.95 },
                    { threshold: 25, multiplier: 1.75 },
                    { threshold: 30, multiplier: 1.55 },
                    { threshold: 35, multiplier: 1.35 },
                    { threshold: 40, multiplier: 1.15 }
                ],
                baseMultiplier: 1.1
            },
            'Earnings Quality & Impact Analysis': {
                ranges: [
                    { threshold: 5, multiplier: 3.35 },
                    { threshold: 10, multiplier: 2.95 },
                    { threshold: 15, multiplier: 2.65 },
                    { threshold: 20, multiplier: 2.45 },
                    { threshold: 25, multiplier: 2.25 },
                    { threshold: 30, multiplier: 2.05 },
                    { threshold: 35, multiplier: 1.85 },
                    { threshold: 40, multiplier: 1.65 }
                ],
                baseMultiplier: 1.6
            },
            'Material Contract Review': {
                ranges: [
                    { threshold: 5, multiplier: 2.75 },
                    { threshold: 10, multiplier: 2.35 },
                    { threshold: 15, multiplier: 2.05 },
                    { threshold: 20, multiplier: 1.85 },
                    { threshold: 25, multiplier: 1.65 },
                    { threshold: 30, multiplier: 1.45 },
                    { threshold: 35, multiplier: 1.25 },
                    { threshold: 40, multiplier: 1.05 }
                ],
                baseMultiplier: 1.0
            }
        };

        // Feature impact values
        this.FEATURES = {
            'Red Flag Detection': 0.15,
            'Hidden Risks Identification': 0.12,
            'Cross-Document Analysis': 0.18,
            'Data Consistency': 0.10
        };

        // Initialize after DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        try {
            // Get DOM elements
            this.timeNumber = document.getElementById('timeNumber');
            this.timeRange = document.getElementById('timeRange');
            this.analysisTypeSelect = document.querySelector('.form-select');
            this.checkboxes = document.querySelectorAll('.checkbox-input');
            this.hoursResultElement = document.querySelector('.hours-saved');
            this.secondsResultElement = document.querySelector('.seconds');
            this.learnMoreButton = document.querySelector('.learn-more-button');

            // Set up event listeners
            this.setupEventListeners();
            
            // Initial calculation
            this.calculate();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    setupEventListeners() {
        // Add debouncing for performance
        let calculateTimeout;
        const debouncedCalculate = () => {
            clearTimeout(calculateTimeout);
            calculateTimeout = setTimeout(() => this.calculate(), 100);
        };

        // Time range input
        this.timeRange.addEventListener('input', (e) => {
            try {
                const value = this.validateTimeValue(e.target.value);
                this.timeNumber.value = value;
                this.hours = value;
                debouncedCalculate();
            } catch (error) {
                console.error('Range input error:', error);
            }
        });

        // Number input
        this.timeNumber.addEventListener('input', (e) => {
            try {
                const value = this.validateTimeValue(e.target.value);
                this.timeRange.value = value;
                this.hours = value;
                debouncedCalculate();
            } catch (error) {
                console.error('Number input error:', error);
            }
        });

        // Analysis type selection
        this.analysisTypeSelect.addEventListener('change', (e) => {
            try {
                this.selectedType = e.target.value;
                this.calculate();
            } catch (error) {
                console.error('Analysis type selection error:', error);
            }
        });

        // Checkboxes
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                try {
                    const label = e.target.closest('.checkbox-label');
                    const featureName = label.textContent.trim();
                    
                    if (e.target.checked) {
                        this.enabledFeatures.add(featureName);
                    } else {
                        this.enabledFeatures.delete(featureName);
                    }
                    
                    this.calculate();
                } catch (error) {
                    console.error('Checkbox handling error:', error);
                }
            });
        });

        // Mobile touch support
        if ('ontouchstart' in window) {
            this.timeRange.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const value = this.validateTimeValue(e.target.value);
                this.timeNumber.value = value;
                this.hours = value;
                debouncedCalculate();
            });

            this.timeRange.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const value = this.validateTimeValue(e.target.value);
                this.timeNumber.value = value;
                this.hours = value;
                debouncedCalculate();
            });
        }

        // Learn More button
        if (this.learnMoreButton) {
            this.learnMoreButton.addEventListener('click', () => {
                // Add your learn more button functionality here
                console.log('Learn More clicked');
            });
        }
    }

    validateTimeValue(value) {
        let numValue = parseFloat(value);
        if (isNaN(numValue)) numValue = 0;
        if (numValue < 0) numValue = 0;
        if (numValue > 40) numValue = 40;
        return numValue;
    }

    calculateTimeMultiplier() {
        try {
            const config = this.ANALYSIS_TYPES[this.selectedType];
            if (!config) throw new Error('Invalid analysis type configuration');

            const hours = this.hours;
            
            for (const range of config.ranges) {
                if (hours <= range.threshold) {
                    return range.multiplier;
                }
            }
            
            return config.ranges[config.ranges.length - 1].multiplier;
        } catch (error) {
            console.error('Time multiplier calculation error:', error);
            return 1.0; // fallback multiplier
        }
    }

    calculateFeatureMultiplier() {
        try {
            let multiplier = 0;
            
            for (const feature of this.enabledFeatures) {
                if (this.FEATURES[feature]) {
                    multiplier += this.FEATURES[feature];
                }
            }
            
            return multiplier;
        } catch (error) {
            console.error('Feature multiplier calculation error:', error);
            return 0;
        }
    }

    calculate() {
        try {
            const baseConfig = this.ANALYSIS_TYPES[this.selectedType];
            if (!baseConfig) throw new Error('Invalid analysis type');

            const timeMultiplier = this.calculateTimeMultiplier();
            const featureMultiplier = this.calculateFeatureMultiplier();
            
            // Calculate total multiplier
            const totalMultiplier = (timeMultiplier * baseConfig.baseMultiplier) + featureMultiplier;
            
            // Calculate hours saved
            const hoursSaved = this.hours * totalMultiplier;
            
            // Calculate seconds (fractional part of hours * 3600)
            const totalSeconds = hoursSaved * 3600;
            const wholeHours = Math.floor(hoursSaved);
            const remainingSeconds = Math.round((totalSeconds - (wholeHours * 3600)) * 1000) / 1000;

            // Update display
            this.updateDisplay(hoursSaved, remainingSeconds);
        } catch (error) {
            console.error('Calculation error:', error);
            this.updateDisplay(0, 0); // Show zero in case of error
        }
    }

    updateDisplay(hours, seconds) {
        try {
            // Format hours with commas and 3 decimal places
            const formattedHours = hours.toLocaleString('en-US', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            });
            
            // Update the display elements
            if (this.hoursResultElement) {
                this.hoursResultElement.textContent = `${formattedHours} Hours Saved`;
            }
            
            if (this.secondsResultElement) {
                this.secondsResultElement.textContent = `${seconds.toFixed(3)} seconds`;
            }

            // Optional: Add animation class for value changes
            this.addUpdateAnimation();
        } catch (error) {
            console.error('Display update error:', error);
            // Fallback display
            if (this.hoursResultElement) {
                this.hoursResultElement.textContent = '0.000 Hours Saved';
            }
            if (this.secondsResultElement) {
                this.secondsResultElement.textContent = '0.000 seconds';
            }
        }
    }

    addUpdateAnimation() {
        // Add a subtle animation when values update
        const elements = [this.hoursResultElement, this.secondsResultElement];
        
        elements.forEach(element => {
            if (element) {
                element.classList.remove('update-flash');
                // Trigger reflow
                void element.offsetWidth;
                element.classList.add('update-flash');
            }
        });
    }

    // Utility method to validate analysis type
    validateAnalysisType(type) {
        return this.ANALYSIS_TYPES.hasOwnProperty(type) ? type : 'Fraud Detection';
    }

    // Utility method to format numbers
    formatNumber(number, decimals = 3) {
        try {
            return number.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        } catch (error) {
            console.error('Number formatting error:', error);
            return '0.000';
        }
    }

    // Utility method to handle feature toggles
    handleFeatureToggle(featureName, enabled) {
        try {
            if (enabled) {
                this.enabledFeatures.add(featureName);
            } else {
                this.enabledFeatures.delete(featureName);
            }
            this.calculate();
        } catch (error) {
            console.error('Feature toggle error:', error);
        }
    }

    // Method to reset calculator to default state
    reset() {
        try {
            // Reset values
            this.hours = 5;
            this.selectedType = 'Fraud Detection';
            this.enabledFeatures = new Set(['Red Flag Detection', 'Hidden Risks Identification', 'Cross-Document Analysis']);

            // Reset UI elements
            if (this.timeNumber) this.timeNumber.value = '5';
            if (this.timeRange) this.timeRange.value = '5';
            if (this.analysisTypeSelect) this.analysisTypeSelect.value = 'Fraud Detection';

            // Reset checkboxes
            this.checkboxes.forEach(checkbox => {
                const label = checkbox.closest('.checkbox-label');
                const featureName = label.textContent.trim();
                checkbox.checked = this.enabledFeatures.has(featureName);
            });

            // Recalculate
            this.calculate();
        } catch (error) {
            console.error('Reset error:', error);
        }
    }

    // Method to export current calculations
    exportCalculations() {
        try {
            return {
                analysisType: this.selectedType,
                hours: this.hours,
                enabledFeatures: Array.from(this.enabledFeatures),
                result: {
                    hoursSaved: this.formatNumber(this.hours * this.calculateTimeMultiplier()),
                    features: this.calculateFeatureMultiplier(),
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('Export error:', error);
            return null;
        }
    }
}

// Initialize the calculator
const calculator = new CalculatorEngine();

// Optional: Add to window object for external access
window.calculatorEngine = calculator;

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .update-flash {
        animation: flash-update 0.5s ease-out;
    }

    @keyframes flash-update {
        0% { opacity: 0.7; }
        100% { opacity: 1; }
    }

    .time-input {
        position: relative;
    }

    .time-input input:focus {
        outline: 2px solid #0088aa;
        border-color: #0088aa;
    }

    .range-container {
        position: relative;
        padding: 10px 0;
    }

    .range-input {
        width: 100%;
        cursor: pointer;
    }

    .range-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        font-size: 0.875rem;
        color: #666;
    }
`;
document.head.appendChild(style);