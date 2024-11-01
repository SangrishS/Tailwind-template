class CalculatorEngine {
    constructor() {
        this.defaultValues = {
            "Fraud Detection": 16,
            "M&A Analysis": 5,
            "Financial Health": 4,
            "Compliance Analysis": 8,
            "Benchmarking": 3,
            "Corporate Vulnerabilities": 6,
            "Management & Governance": 5,
            "Legal & Litigation Review": 7,
            "Regulatory Compliance Review": 7,
            "Segment Reporting Analysis": 7,
            "Earnings Quality & Impact Analysis": 8,
            "Material Contract Review": 5
        };
        
        this.selectedType = 'Fraud Detection'; // Default selection
        this.hours = this.defaultValues[this.selectedType]; // Set initial hours based on default value

        // Initialize after DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        try {
            this.timeNumber = document.getElementById('timeNumber');
            this.timeRange = document.getElementById('timeRange');
            this.analysisTypeSelect = document.querySelector('.form-select');
            this.hoursResultElement = document.querySelector('.hours-saved');
            this.secondsResultElement = document.querySelector('.seconds');
            
            this.setupEventListeners();
            this.calculate();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    setupEventListeners() {
        let calculateTimeout;
        const debouncedCalculate = () => {
            clearTimeout(calculateTimeout);
            calculateTimeout = setTimeout(() => this.calculate(), 100);
        };

        this.timeRange.addEventListener('input', (e) => {
            try {
                const value = this.validateTimeValue(e.target.value);
                this.timeNumber.value = value;
                this.hours = value; // Update hours based on slider
                debouncedCalculate();
            } catch (error) {
                console.error('Range input error:', error);
            }
        });

        this.timeNumber.addEventListener('input', (e) => {
            try {
                const value = this.validateTimeValue(e.target.value);
                this.timeRange.value = value;
                this.hours = value; // Update hours based on input
                debouncedCalculate();
            } catch (error) {
                console.error('Number input error:', error);
            }
        });

        this.analysisTypeSelect.addEventListener('change', (e) => {
            try {
                this.selectedType = e.target.value;
                this.hours = this.defaultValues[this.selectedType]; // Reset to default value for new selection
                this.timeNumber.value = this.hours; // Update the number input
                this.timeRange.value = this.hours; // Update the range input
                this.calculate();
            } catch (error) {
                console.error('Analysis type selection error:', error);
            }
        });
    }

    calculate() {
        try {
            // Calculate adjusted hours based on the selected type
            const adjustedHours = this.hours - (this.defaultValues[this.selectedType] * 0.004); // Example adjustment
            this.updateDisplay(adjustedHours);
        } catch (error) {
            console.error('Calculation error:', error);
            this.updateDisplay(0);
        }
    }

    updateDisplay(hours) {
        try {
            const formattedHours = hours.toLocaleString('en-US', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            });
            
            if (this.hoursResultElement) {
                this.hoursResultElement.textContent = `${formattedHours} Hours Saved`;
            }
            // Additional display logic can be added here if needed
        } catch (error) {
            console.error('Display update error:', error);
        }
    }

    validateTimeValue(value) {
        let numValue = parseFloat(value);
        if (isNaN(numValue)) numValue = 0;
        if (numValue < 0) numValue = 0;
        if (numValue > 40) numValue = 40; // Assuming max hours is 40
        return numValue;
    }
}

// Initialize calculator
const calculator = new CalculatorEngine();
