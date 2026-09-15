import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Checklist() {
    const { country: urlCountry } = useParams();

    const [country, setCountry] = useState(urlCountry || "");
    const [checklist, setChecklist] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});

    const commonRequirements = [
        {
            title: "Valid Passport",
            description:
                "Your passport should be valid for the required period.",
            category: "Travel Document"
        },
        {
            title: "Travel Insurance",
            description:
                "Carry valid travel insurance covering your complete trip.",
            category: "Insurance"
        },
        {
            title: "Vaccination Records",
            description:
                "Keep required vaccination certificates available.",
            category: "Health"
        },
        {
            title: "Flight Tickets",
            description:
                "Keep your confirmed flight or travel tickets ready.",
            category: "Travel"
        },
        {
            title: "Accommodation Details",
            description:
                "Keep your hotel or accommodation confirmation ready.",
            category: "Accommodation"
        },
        {
            title: "Proof of Sufficient Funds",
            description:
                "Carry documents showing sufficient funds for your trip.",
            category: "Financial"
        }
    ];

    const countryRequirements = {
        germany: [
            {
                title: "Valid Schengen Visa",
                description:
                    "Make sure your Schengen visa is valid for your planned travel dates.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Financial Means",
                description:
                    "Carry documents showing that you can financially support your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        france: [
            {
                title: "Valid Schengen Visa",
                description:
                    "Make sure your Schengen visa is valid for your planned travel dates.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Financial Means",
                description:
                    "Carry documents showing sufficient funds for your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        italy: [
            {
                title: "Valid Schengen Visa",
                description:
                    "Make sure your Schengen visa is valid for your planned travel dates.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Financial Means",
                description:
                    "Carry documents showing sufficient funds for your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        spain: [
            {
                title: "Valid Schengen Visa",
                description:
                    "Make sure your Schengen visa is valid for your planned travel dates.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Financial Means",
                description:
                    "Carry documents showing sufficient funds for your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        usa: [
            {
                title: "Valid US Visa or ESTA",
                description:
                    "Check that you have the appropriate authorization to enter the United States.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or address of stay available.",
                category: "Accommodation"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            },
            {
                title: "Travel Medical Insurance",
                description:
                    "Carry suitable travel medical insurance for your trip.",
                category: "Insurance"
            }
        ],

        "united states": [
            {
                title: "Valid US Visa or ESTA",
                description:
                    "Check that you have the appropriate authorization to enter the United States.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or address of stay available.",
                category: "Accommodation"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            },
            {
                title: "Travel Medical Insurance",
                description:
                    "Carry suitable travel medical insurance for your trip.",
                category: "Insurance"
            }
        ],

        uk: [
            {
                title: "Valid UK Visa or ETA",
                description:
                    "Check the current entry authorization requirement for your nationality.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation details ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Funds",
                description:
                    "Carry evidence that you can support yourself during your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        "united kingdom": [
            {
                title: "Valid UK Visa or ETA",
                description:
                    "Check the current entry authorization requirement for your nationality.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation details ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Funds",
                description:
                    "Carry evidence that you can support yourself during your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        canada: [
            {
                title: "Valid Canadian Visa or eTA",
                description:
                    "Check that you have the correct authorization to enter Canada.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your hotel booking or accommodation details ready.",
                category: "Accommodation"
            },
            {
                title: "Proof of Funds",
                description:
                    "Carry evidence of sufficient funds for your stay.",
                category: "Financial"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            }
        ],

        australia: [
            {
                title: "Valid Australian Visa",
                description:
                    "Make sure you have the appropriate Australian visa before travelling.",
                category: "Entry Requirement"
            },
            {
                title: "Proof of Accommodation",
                description:
                    "Keep your accommodation details available.",
                category: "Accommodation"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward travel booking available.",
                category: "Travel"
            },
            {
                title: "Health and Vaccination Documents",
                description:
                    "Carry any health documents required for your journey.",
                category: "Health"
            }
        ],

        singapore: [
            {
                title: "Valid Entry Visa",
                description:
                    "Check whether you require a Singapore entry visa.",
                category: "Entry Requirement"
            },
            {
                title: "Accommodation Details",
                description:
                    "Keep your hotel or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your confirmed onward or return ticket available.",
                category: "Travel"
            },
            {
                title: "Health Documents",
                description:
                    "Check whether any health or vaccination documents are required.",
                category: "Health"
            }
        ],

        dubai: [
            {
                title: "Valid UAE Visa",
                description:
                    "Make sure your UAE entry authorization is valid.",
                category: "Entry Requirement"
            },
            {
                title: "Accommodation Details",
                description:
                    "Keep your hotel or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward ticket available.",
                category: "Travel"
            },
            {
                title: "Proof of Funds",
                description:
                    "Carry evidence of sufficient funds for your trip.",
                category: "Financial"
            }
        ],

        "united arab emirates": [
            {
                title: "Valid UAE Visa",
                description:
                    "Make sure your UAE entry authorization is valid.",
                category: "Entry Requirement"
            },
            {
                title: "Accommodation Details",
                description:
                    "Keep your hotel or accommodation confirmation ready.",
                category: "Accommodation"
            },
            {
                title: "Return or Onward Ticket",
                description:
                    "Keep your return or onward ticket available.",
                category: "Travel"
            },
            {
                title: "Proof of Funds",
                description:
                    "Carry evidence of sufficient funds for your trip.",
                category: "Financial"
            }
        ]
    };

    const getRequirementsForCountry = (destination) => {
        const normalizedCountry = destination
            .trim()
            .toLowerCase();

        const specificRequirements =
            countryRequirements[normalizedCountry] || [];

        return [
            ...commonRequirements,
            ...specificRequirements
        ];
    };

    const createInitialCheckedState = (items) => {
        const initialState = {};

        items.forEach((_, index) => {
            initialState[index] = false;
        });

        return initialState;
    };

    const loadChecklist = (destination = country) => {
        if (!destination.trim()) {
            setChecklist([]);
            setCheckedItems({});
            return;
        }

        const requirements =
            getRequirementsForCountry(destination);

        setChecklist(requirements);
        setCheckedItems(
            createInitialCheckedState(requirements)
        );
    };

    const handleSearch = () => {
        loadChecklist(country);
    };

    const handleCheckboxChange = (index) => {
        setCheckedItems((previous) => ({
            ...previous,
            [index]: !previous[index]
        }));
    };

    const completedCount = checklist.reduce(
        (count, _, index) => {
            return (
                count +
                (checkedItems[index] === true ? 1 : 0)
            );
        },
        0
    );

    const progress =
        checklist.length > 0
            ? Math.round(
                (completedCount / checklist.length) * 100
            )
            : 0;

    useEffect(() => {
        if (urlCountry) {
            setCountry(urlCountry);

            const requirements =
                getRequirementsForCountry(urlCountry);

            setChecklist(requirements);

            setCheckedItems(
                createInitialCheckedState(requirements)
            );
        } else {
            setChecklist([]);
            setCheckedItems({});
        }
    }, [urlCountry]);

    return (
        <div className="checklist-page">

            <div className="documents-header">

                <div>
                    <h1>Destination Checklist</h1>

                    <p>
                        Prepare everything you need before
                        travelling to your destination.
                    </p>
                </div>

            </div>


            <div className="checklist-search">

                <input
                    type="text"
                    placeholder="Enter destination country"
                    value={country}
                    onChange={(event) =>
                        setCountry(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <button onClick={handleSearch}>
                    Check Requirements
                </button>

            </div>


            {country && checklist.length > 0 && (

                <div className="checklist-results">

                    <div className="checklist-results-header">

                        <div>
                            <h2>
                                Travel Checklist for {country}
                            </h2>

                            <p>
                                Make sure you have completed the
                                important requirements before your trip.
                            </p>
                        </div>

                        <div className="checklist-progress-summary">

                            <strong>
                                {completedCount}
                            </strong>

                            <span>
                                / {checklist.length} completed
                            </span>

                        </div>

                    </div>


                    <div className="checklist-progress-container">

                        <div className="checklist-progress-bar">

                            <div
                                className="checklist-progress-fill"
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>

                        <span>
                            {progress}% complete
                        </span>

                    </div>


                    <div className="checklist-items">

                        {checklist.map((item, index) => (

                            <div
                                className={`checklist-item ${
                                    checkedItems[index]
                                        ? "completed"
                                        : ""
                                }`}
                                key={index}
                            >

                                <input
                                    type="checkbox"
                                    id={`check-${index}`}
                                    checked={
                                        checkedItems[index] === true
                                    }
                                    onChange={() =>
                                        handleCheckboxChange(index)
                                    }
                                />

                                <div className="checklist-item-content">

                                    <label
                                        htmlFor={`check-${index}`}
                                    >
                                        {item.title}
                                    </label>

                                    <p>
                                        {item.description}
                                    </p>

                                    <span className="checklist-category">
                                        {item.category}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>


                    {completedCount === checklist.length &&
                        checklist.length > 0 && (

                            <div className="checklist-complete-message">

                                ✓ All checklist items completed.
                                You are ready to review your travel
                                documents.

                            </div>

                        )}

                </div>

            )}

        </div>
    );
}

export default Checklist;